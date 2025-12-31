import OrderedList from "@tiptap/extension-ordered-list";

export const StyledOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: "decimal",
        parseHTML: element =>
          element.style.listStyleType || "decimal",
        renderHTML: attributes => ({
          style: `list-style-type: ${attributes.listStyleType}`,
        }),
      },
    };
  },
});
