/* eslint-disable tailwind-rtl/tailwind/no-physical-classes */
const assert = require("node:assert");
const { describe, it } = require("node:test");
const { RuleTester } = require("eslint");
const rule = require("../../../src/rules/css-in-js/no-physical-values");

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
    },
  },
});

describe("css-in-js/no-physical-values", () => {
  it("flags physical direction values and suggests logical alternatives", () => {
    ruleTester.run("no-physical-values", rule, {
      valid: [
        { code: 'const styles = { textAlign: "start" }' },
        { code: 'const styles = { textAlign: "end" }' },
        { code: 'const styles = { textAlign: "center" }' },
        { code: 'const styles = { float: "inline-start" }' },
        { code: 'const styles = { clear: "inline-end" }' },
        { code: 'const styles = { color: "red" }' },
        { code: 'const styles = { marginTop: "1rem" }' },
        { code: "const left = 'left'" },
      ],
      invalid: [
        {
          code: 'const styles = { textAlign: "left" }',
          output: 'const styles = { textAlign: "start" }',
          errors: [{ messageId: "noPhysicalValues" }],
        },
        {
          code: 'const styles = { textAlign: "right" }',
          output: 'const styles = { textAlign: "end" }',
          errors: [{ messageId: "noPhysicalValues" }],
        },
        {
          code: 'const styles = { float: "left" }',
          output: 'const styles = { float: "inline-start" }',
          errors: [{ messageId: "noPhysicalValues" }],
        },
        {
          code: 'const styles = { float: "right" }',
          output: 'const styles = { float: "inline-end" }',
          errors: [{ messageId: "noPhysicalValues" }],
        },
        {
          code: 'const styles = { clear: "left" }',
          output: 'const styles = { clear: "inline-start" }',
          errors: [{ messageId: "noPhysicalValues" }],
        },
        {
          code: 'const styles = { clear: "right" }',
          output: 'const styles = { clear: "inline-end" }',
          errors: [{ messageId: "noPhysicalValues" }],
        },
        {
          code: 'const styles = { textAlign: "left", float: "right" }',
          output: 'const styles = { textAlign: "start", float: "inline-end" }',
          errors: [
            { messageId: "noPhysicalValues" },
            { messageId: "noPhysicalValues" },
          ],
        },
        {
          code: 'const styles = { textAlign: "left", clear: "left" }',
          output:
            'const styles = { textAlign: "start", clear: "inline-start" }',
          errors: [
            { messageId: "noPhysicalValues" },
            { messageId: "noPhysicalValues" },
          ],
        },
      ],
    });
  });
});
