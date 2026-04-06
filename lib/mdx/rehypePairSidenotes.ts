/**
 * Moves GFM footnote definitions next to the block that contains each reference,
 * so sidenotes scroll with the text (no sticky column). CSS targets `.sidenote-row`.
 */

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

function getClassNames(el: HastNode): string[] {
  const c = el.properties?.className;
  if (Array.isArray(c)) return c.map(String);
  if (typeof c === "string") return [c];
  return [];
}

function isPostBody(el: HastNode): boolean {
  return (
    el.type === "element" &&
    el.tagName === "div" &&
    getClassNames(el).includes("post-body")
  );
}

function isFootnotesSection(el: HastNode): boolean {
  return (
    el.type === "element" &&
    el.tagName === "section" &&
    getClassNames(el).includes("footnotes")
  );
}

function getHref(el: HastNode): string | undefined {
  const h = el.properties?.href;
  return typeof h === "string" ? h : undefined;
}

function getId(el: HastNode): string | undefined {
  const id = el.properties?.id;
  if (typeof id === "string") return id;
  if (Array.isArray(id) && id.length > 0) return String(id[0]);
  return undefined;
}

function isBackrefAnchor(el: HastNode): boolean {
  if (el.type !== "element" || el.tagName !== "a") return false;
  const href = getHref(el);
  if (href?.includes("fnref")) return true;
  return el.properties?.dataFootnoteBackref !== undefined;
}

function setParents(
  node: HastNode,
  parent: HastNode | null,
  map: WeakMap<HastNode, HastNode | null>,
): void {
  map.set(node, parent);
  for (const child of node.children ?? []) {
    setParents(child, node, map);
  }
}

/**
 * Block to pair with sidenotes: usually a direct child of `.post-body`, but if
 * the ref sits inside a list, use the innermost `li` so the note sits beside
 * that item (not the whole `ul`).
 */
function findSidenoteBlock(
  node: HastNode,
  postBody: HastNode,
  parents: WeakMap<HastNode, HastNode | null>,
): HastNode | null {
  let cur: HastNode | null = node;
  while (cur) {
    const parentNode: HastNode | null = parents.get(cur) ?? null;
    if (!parentNode) return null;
    if (parentNode === postBody) {
      return cur;
    }
    if (
      parentNode.type === "element" &&
      (parentNode.tagName === "ul" || parentNode.tagName === "ol") &&
      cur.type === "element" &&
      cur.tagName === "li"
    ) {
      return cur;
    }
    cur = parentNode;
  }
  return null;
}

/** Pre-order element index for sorting blocks (incl. nested `li`). */
function buildElementOrderMap(root: HastNode): WeakMap<HastNode, number> {
  const map = new WeakMap<HastNode, number>();
  let seq = 0;
  function walk(n: HastNode): void {
    if (n.type === "element") {
      map.set(n, seq++);
    }
    for (const c of n.children ?? []) {
      walk(c as HastNode);
    }
  }
  walk(root);
  return map;
}

function findForwardRefAnchor(
  postBody: HastNode,
  footnotesSection: HastNode,
  defId: string,
): HastNode | null {
  const target = `#${defId}`;
  let found: HastNode | null = null;

  function walk(n: HastNode): void {
    if (found) return;
    if (n === footnotesSection) return;
    if (
      n.type === "element" &&
      n.tagName === "a" &&
      getHref(n) === target &&
      !isBackrefAnchor(n)
    ) {
      found = n;
      return;
    }
    for (const child of n.children ?? []) {
      if (child === footnotesSection) continue;
      walk(child);
    }
  }

  walk(postBody);
  return found;
}

function getTextContent(node: HastNode): string {
  if (node.type === "text") {
    const v = (node as { value?: unknown }).value;
    return typeof v === "string" ? v : "";
  }
  let s = "";
  for (const c of node.children ?? []) {
    s += getTextContent(c as HastNode);
  }
  return s;
}

function removeBackrefLinks(node: HastNode): void {
  if (node.type !== "element" || !node.children) return;
  node.children = node.children.filter((child) => {
    if (
      child.type === "element" &&
      child.tagName === "a" &&
      isBackrefAnchor(child)
    ) {
      return false;
    }
    removeBackrefLinks(child);
    return true;
  });
}

function liToAside(li: HastNode, refAnchor: HastNode, fallbackIndex: number): HastNode {
  removeBackrefLinks(li);
  const id = getId(li);
  const raw = getTextContent(refAnchor).trim();
  const mark =
    raw.length > 0 ? raw : String(Math.max(1, fallbackIndex + 1));

  const markSpan: HastNode = {
    type: "element",
    tagName: "span",
    properties: { className: ["sidenote-ref"] },
    children: [{ type: "text", value: mark }],
  };

  return {
    type: "element",
    tagName: "aside",
    properties: {
      className: ["sidenote"],
      ...(id !== undefined ? { id: `${id}-aside` } : {}),
    },
    children: [markSpan, ...(li.children ? [...li.children] : [])],
  };
}

function findPostBody(root: HastNode): HastNode | null {
  for (const c of root.children ?? []) {
    if (isPostBody(c)) return c;
  }
  return null;
}

/** Document order among in-text footnote links (for multiple notes in one block). */
function footnoteRefOrder(
  postBody: HastNode,
  footnotesSection: HastNode,
  anchor: HastNode,
): number {
  let seq = 0;
  let hit = -1;

  function walk(n: HastNode): void {
    if (n === footnotesSection) return;
    if (
      n.type === "element" &&
      n.tagName === "a" &&
      !isBackrefAnchor(n)
    ) {
      const href = getHref(n);
      if (href?.startsWith("#") && href.includes("fn-") && !href.includes("fnref")) {
        if (n === anchor) hit = seq;
        seq++;
      }
    }
    for (const child of n.children ?? []) {
      if (child === footnotesSection) continue;
      walk(child);
    }
  }

  walk(postBody);
  return hit >= 0 ? hit : 0;
}

export function rehypePairSidenotes() {
  return function (tree: HastNode): void {
    if (tree.type !== "root" || !tree.children?.length) return;

    const postBody = findPostBody(tree);
    if (!postBody?.children) return;

    const footnotesSection = postBody.children.find((c) =>
      isFootnotesSection(c),
    ) as HastNode | undefined;
    if (!footnotesSection?.children) return;

    const ol = footnotesSection.children.find(
      (c) => c.type === "element" && c.tagName === "ol",
    ) as HastNode | undefined;
    if (!ol?.children?.length) return;

    const parents = new WeakMap<HastNode, HastNode | null>();
    setParents(tree, null, parents);

    type Pair = {
      li: HastNode;
      block: HastNode;
      refOrder: number;
      anchor: HastNode;
    };
    const pairs: Pair[] = [];

    const liOlIndex = new Map<HastNode, number>();
    let olOrdinal = 0;
    for (const li of ol.children) {
      if (li.type !== "element" || li.tagName !== "li") continue;
      const defId = getId(li);
      if (!defId) continue;

      const anchor = findForwardRefAnchor(postBody, footnotesSection, defId);
      if (!anchor) continue;

      const block = findSidenoteBlock(anchor, postBody, parents);
      if (!block) continue;

      const refOrder = footnoteRefOrder(
        postBody,
        footnotesSection,
        anchor,
      );
      liOlIndex.set(li, olOrdinal);
      olOrdinal++;
      pairs.push({ li, block, refOrder, anchor });
    }

    if (pairs.length === 0) return;

    const byBlock = new Map<HastNode, HastNode[]>();
    for (const p of pairs) {
      const list = byBlock.get(p.block) ?? [];
      list.push(p.li);
      byBlock.set(p.block, list);
    }

    const elementOrder = buildElementOrderMap(postBody);
    const blockOrder = (b: HastNode) => elementOrder.get(b) ?? -1;

    const sortedBlocks = [...byBlock.keys()].sort(
      (a, b) => blockOrder(a) - blockOrder(b),
    );

    for (let i = sortedBlocks.length - 1; i >= 0; i--) {
      const block = sortedBlocks[i];
      const lis = byBlock.get(block)!;

      const orderOf = new Map<HastNode, number>();
      for (const p of pairs) {
        if (lis.includes(p.li)) orderOf.set(p.li, p.refOrder);
      }
      lis.sort((a, b) => (orderOf.get(a) ?? 0) - (orderOf.get(b) ?? 0));

      const anchorByLi = new Map(
        pairs.filter((p) => lis.includes(p.li)).map((p) => [p.li, p.anchor] as const),
      );
      const asides = lis.map((li) =>
        liToAside(li, anchorByLi.get(li)!, liOlIndex.get(li) ?? 0),
      );
      const row: HastNode = {
        type: "element",
        tagName: "div",
        properties: { className: ["sidenote-row"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["sidenote-anchor"] },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["sidenote-main"] },
                children:
                  block.type === "element" && block.tagName === "li"
                    ? [...(block.children ?? [])]
                    : [block],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["sidenote-margin"] },
                children: asides,
              },
            ],
          },
        ],
      };

      const listParent = parents.get(block);
      if (
        block.type === "element" &&
        block.tagName === "li" &&
        listParent?.type === "element" &&
        (listParent.tagName === "ul" || listParent.tagName === "ol") &&
        listParent.children
      ) {
        const idx = listParent.children.indexOf(block);
        if (idx === -1) continue;
        const newLi: HastNode = {
          type: "element",
          tagName: "li",
          properties: block.properties ? { ...block.properties } : {},
          children: [row],
        };
        listParent.children[idx] = newLi;
      } else {
        const idx = postBody.children!.indexOf(block);
        if (idx === -1) continue;
        postBody.children![idx] = row;
      }
    }

    const matched = new Set(pairs.map((p) => p.li));
    ol.children = ol.children.filter((li) => !matched.has(li));

    if (ol.children.length === 0) {
      const fsIdx = postBody.children!.indexOf(footnotesSection);
      if (fsIdx !== -1) {
        postBody.children!.splice(fsIdx, 1);
      }
    }
  };
}
