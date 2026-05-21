const {
  CSS_IN_JS_PROPERTIES,
  physicalProperties,
} = require("../../maps/css-in-js");

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow physical direction CSS-in-JS properties in favor of logical properties",
      recommended: true,
    },
    fixable: "code",
    messages: {
      noPhysicalProperties:
        'Use logical property "{{logical}}" instead of physical property "{{physical}}"',
    },
    schema: [],
  },

  create(context) {
    return {
      Property(node) {
        if (node.key.type !== "Identifier") return;

        const propertyName = node.key.name;
        if (!physicalProperties.includes(propertyName)) return;

        const logicalProperty = CSS_IN_JS_PROPERTIES[propertyName];

        context.report({
          node,
          messageId: "noPhysicalProperties",
          data: {
            physical: propertyName,
            logical: logicalProperty,
          },
          fix(fixer) {
            return fixer.replaceText(node.key, logicalProperty);
          },
        });
      },
    };
  },
};
