/* eslint-disable tailwind-rtl/tailwind/no-physical-classes */
const assert = require("node:assert");
const { describe, it } = require("node:test");
const { RuleTester } = require("eslint");
const rule = require("../../../src/rules/tailwind/no-physical-classes");

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      ecmaFeatures: { jsx: true },
    },
  },
});

describe("tailwind/no-physical-classes", () => {
  it("flags physical direction classes and suggests logical alternatives", () => {
    ruleTester.run("no-physical-classes", rule, {
      valid: [
        { code: '<div className="ms-4 me-2 ps-3 pe-1 text-start" />' },
        { code: '<div className="flex items-center" />' },
      ],
      invalid: [
        {
          code: '<div className="ml-4" />',
          output: '<div className="ms-4" />',
          errors: [{ messageId: "noPhysicalClasses" }],
        },
        {
          code: '<div className="mr-2" />',
          output: '<div className="me-2" />',
          errors: [{ messageId: "noPhysicalClasses" }],
        },
        {
          code: '<div className="pl-3 pr-1 text-left" />',
          output: '<div className="ps-3 pe-1 text-start" />',
          errors: [
            { messageId: "noPhysicalClasses" },
            { messageId: "noPhysicalClasses" },
            { messageId: "noPhysicalClasses" },
          ],
        },
      ],
    });
  });
});
