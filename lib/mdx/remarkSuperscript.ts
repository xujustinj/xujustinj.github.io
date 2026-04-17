import type { Literal, Node, Parent } from "unist";
import { visit } from "unist-util-visit";

/**
 * Pandoc-style superscript: `20^th^` → `<sup>th</sup>`.
 * Runs after {@link remark-math} so `^` inside `$…$` stays in math nodes.
 */
export function remarkSuperscript() {
  return (tree: Parent) => {
    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== "number" || node.type !== "text") {
        return;
      }

      const raw = (node as Literal).value;
      if (typeof raw !== "string") {
        return;
      }

      const values = raw.split("^");
      if (values.length === 1 || values.length % 2 === 0) {
        return;
      }

      const children: Node[] = values.map((str, i) =>
        i % 2 === 0
          ? { type: "text", value: str }
          : {
              type: "superscript",
              data: { hName: "sup" },
              children: [{ type: "text", value: str }],
            },
      );

      parent.children.splice(index, 1, ...children);
    });
  };
}
