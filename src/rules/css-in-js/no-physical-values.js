/* eslint-disable tailwind-rtl/tailwind/no-physical-classes */
/* eslint-disable tailwind-rtl/css-in-js/no-physical-properties */
const { DIRECTIONAL_VALUE_PROPERTIES } = require("../../maps/css-in-js");

const TEXT_ALIGN_VALUES = {
  left: "start",
  right: "end",
};

const FLOAT_CLEAR_VALUES = {
  left: "inline-start",
  right: "inline-end",
};

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        'Disallow physical direction values ("left"/"right") in CSS-in-JS properties that support logical alternatives',
      recommended: true,
    },
    fixable: "code",
    messages: {
      noPhysicalValues:
        'Use logical value "{{logical}}" instead of physical value "{{physical}}" in {{property}}',
    },
    schema: [],
  },

  create(context) {
    return {
      Property(node) {
        if (node.key.type !== "Identifier") return;
        if (!DIRECTIONAL_VALUE_PROPERTIES.has(node.key.name)) return;
        if (
          node.value.type !== "Literal" ||
          typeof node.value.value !== "string"
        )
          return;

        const propName = node.key.name;
        const propValue = node.value.value;
        if (propValue !== "left" && propValue !== "right") return;

        const valueMap =
          propName === "textAlign" ? TEXT_ALIGN_VALUES : FLOAT_CLEAR_VALUES;
        const logicalValue = valueMap[propValue];

        context.report({
          node: node.value,
          messageId: "noPhysicalValues",
          data: {
            physical: propValue,
            logical: logicalValue,
            property: propName,
          },
          fix(fixer) {
            return fixer.replaceTextRange(
              [node.value.range[0] + 1, node.value.range[1] - 1],
              logicalValue,
            );
          },
        });
      },
    };
  },
};
