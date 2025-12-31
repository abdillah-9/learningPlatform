import BulletList from "@tiptap/extension-bullet-list";

export const StyledBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: "disc",
        parseHTML: element =>
          element.style.listStyleType || "disc",
        renderHTML: attributes => ({
          style: `list-style-type: ${attributes.listStyleType}`,
        }),
      },
    };
  },
});
