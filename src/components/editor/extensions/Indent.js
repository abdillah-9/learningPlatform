import { Extension } from "@tiptap/core";

export const Indent = Extension.create({
  name: "indent",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"],
        attributes: {
          indent: {
            default: 0,
            parseHTML: element =>
              parseInt(element.style.marginLeft) || 0,
            renderHTML: attributes => {
              if (!attributes.indent) return {};
              return {
                style: `margin-left: ${attributes.indent}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ state, commands }) => {
          const currentIndent =
            state.selection.$from.parent.attrs.indent || 0;

          return commands.updateAttributes("paragraph", {
            indent: currentIndent + 40,
          });
        },

      outdent:
        () =>
        ({ state, commands }) => {
          const currentIndent =
            state.selection.$from.parent.attrs.indent || 0;

          return commands.updateAttributes("paragraph", {
            indent: Math.max(0, currentIndent - 40),
          });
        },
    };
  },
});
