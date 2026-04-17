import type { Root } from "mdast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

/**
 * Pandoc-style superscript: `20^th^` → `<sup>th</sup>`.
 * Runs after {@link remark-math} so `^` inside `$…$` stays in math nodes.
 */
export function remarkSuperscript(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || typeof index !== "number" || node.type !== "text") {
        return;
      }

      const values = node.value.split("^");
      if (values.length === 1 || values.length % 2 === 0) {
        return;
      }

      const children = values.map((str, i) =>
        i % 2 === 0
          ? { type: "text" as const, value: str }
          : {
              type: "superscript" as const,
              data: { hName: "sup" as const },
              children: [{ type: "text" as const, value: str }],
            },
      );

      parent.children.splice(index, 1, ...children);
    });
  };
}
