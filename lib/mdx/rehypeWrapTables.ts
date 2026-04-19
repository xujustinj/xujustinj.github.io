import type { Element, Parents, Root } from "hast";
import { visit } from "unist-util-visit";

const WRAP_CLASS = "post-body-table-wrap";

function getClassNames(properties: Element["properties"] | undefined): string[] {
  const c = properties?.className;
  if (Array.isArray(c)) return c.map(String);
  if (typeof c === "string") return [c];
  return [];
}

/** Wraps each GFM `<table>` in a div so horizontal overflow can scroll. */
export function rehypeWrapTables() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "table") return;
      if (!parent || typeof index !== "number") return;
      if (
        parent.type === "element" &&
        parent.tagName === "div" &&
        getClassNames(parent.properties).includes(WRAP_CLASS)
      ) {
        return;
      }

      const wrap: Element = {
        type: "element",
        tagName: "div",
        properties: { className: [WRAP_CLASS] },
        children: [node],
      };
      (parent as Parents & { children: Element[] }).children[index] = wrap;
    });
  };
}
