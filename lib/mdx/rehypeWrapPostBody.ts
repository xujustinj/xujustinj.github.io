/** Wraps the MDX body so layout targets a single `.post-body` root. */
export function rehypeWrapPostBody() {
  return function (tree: {
    type: string;
    children: unknown[];
  }): void {
    if (tree.type !== "root") return;
    const wrapper = {
      type: "element" as const,
      tagName: "div",
      properties: { className: ["post-body"] },
      children: tree.children,
    };
    tree.children = [wrapper];
  };
}
