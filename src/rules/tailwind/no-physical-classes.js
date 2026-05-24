const { physicalPrefixes, tailwindMap } = require("../../maps/tailwind");

const PHYSICAL_CLASS_PATTERN = new RegExp(
  `^(?:${physicalPrefixes.join("|")})(?:$|-(?!\\[dir:))`,
);

function getLogicalReplacement(className) {
  for (const [physical, logical] of tailwindMap.entries()) {
    if (className === physical || className.startsWith(`${physical}-`)) {
      return className.replace(physical, logical);
    }
  }
  return null;
}

function checkNode(node, context) {
  if (typeof node.value !== "string") return;

  const sourceCode = context.getSourceCode();
  const contentStart = node.range[0] + 1;

  const regex = /\S+/g;
  let match;

  while ((match = regex.exec(node.value)) !== null) {
    const className = match[0];

    if (PHYSICAL_CLASS_PATTERN.test(className)) {
      const replacement = getLogicalReplacement(className);
      if (replacement) {
        const classStart = contentStart + match.index;
        const classEnd = classStart + className.length;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(classStart),
            end: sourceCode.getLocFromIndex(classEnd),
          },
          messageId: "noPhysicalClasses",
          data: {
            message: `Use "${replacement}" instead of "${className}"`,
          },
          fix(fixer) {
            return fixer.replaceTextRange([classStart, classEnd], replacement);
          },
        });
      }
    }
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow physical direction Tailwind classes in favor of logical properties",
      recommended: true,
    },
    fixable: "code",
    messages: {
      noPhysicalClasses: "{{message}}",
    },
    schema: [],
  },

  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== "className") return;
        if (node.value && node.value.type === "Literal") {
          checkNode(node.value, context);
        }
      },
      Literal(node) {
        if (
          node.parent.type === "JSXAttribute" &&
          node.parent.name.name === "className"
        ) {
          return;
        }

        if (typeof node.value === "string") {
          const classNames = node.value.split(/\s+/);
          const hasPhysical = classNames.some((cn) =>
            PHYSICAL_CLASS_PATTERN.test(cn),
          );
          if (hasPhysical) {
            checkNode(node, context);
          }
        }
      },
    };
  },
};
