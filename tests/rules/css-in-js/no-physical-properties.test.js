/* eslint-disable tailwind-rtl/tailwind/no-physical-classes */
const assert = require("node:assert");
const { describe, it } = require("node:test");
const { RuleTester } = require("eslint");
const rule = require("../../../src/rules/css-in-js/no-physical-properties");

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
    },
  },
});

describe("css-in-js/no-physical-properties", () => {
  it("flags physical direction properties and suggests logical alternatives", () => {
    ruleTester.run("no-physical-properties", rule, {
      valid: [
        {
          code: 'const styles = { marginInlineStart: "1rem", paddingInlineEnd: "2rem" }',
        },
        {
          code: 'const styles = { color: "red" }',
        },
        {
          code: "const values = Object.keys(CSS_IN_JS_PROPERTIES)",
        },
      ],
      invalid: [
        {
          code: 'const styles = { marginLeft: "1rem" }',
          output: 'const styles = { marginInlineStart: "1rem" }',
          errors: [{ messageId: "noPhysicalProperties" }],
        },
        {
          code: 'const styles = { paddingRight: "2rem" }',
          output: 'const styles = { paddingInlineEnd: "2rem" }',
          errors: [{ messageId: "noPhysicalProperties" }],
        },
        {
          code: 'const styles = { marginLeft: "1rem", paddingRight: "2rem" }',
          output:
            'const styles = { marginInlineStart: "1rem", paddingInlineEnd: "2rem" }',
          errors: [
            { messageId: "noPhysicalProperties" },
            { messageId: "noPhysicalProperties" },
          ],
        },
        {
          code: 'const styles = { borderLeft: "1px solid red" }',
          output: 'const styles = { borderInlineStart: "1px solid red" }',
          errors: [{ messageId: "noPhysicalProperties" }],
        },
        {
          code: 'const styles = { left: "0" }',
          output: 'const styles = { insetInlineStart: "0" }',
          errors: [{ messageId: "noPhysicalProperties" }],
        },
      ],
    });
  });
});
