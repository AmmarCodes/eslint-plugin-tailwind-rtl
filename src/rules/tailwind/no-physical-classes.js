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

  const classNames = node.value.split(/\s+/);
  const violations = [];

  for (const className of classNames) {
    if (PHYSICAL_CLASS_PATTERN.test(className)) {
      const replacement = getLogicalReplacement(className);
      if (replacement) {
        violations.push({ physical: className, logical: replacement });
      }
    }
  }

  if (violations.length === 0) return;

  const message = violations
    .map((v) => `Use "${v.logical}" instead of "${v.physical}"`)
    .join(", ");

  let fixed = node.raw;
  for (const { physical, logical } of violations) {
    fixed = fixed.replace(physical, logical);
  }

  context.report({
    node,
    messageId: "noPhysicalClasses",
    data: { message },
    fix(fixer) {
      return fixer.replaceText(node, fixed);
    },
  });
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
