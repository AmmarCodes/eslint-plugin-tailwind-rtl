# ESlint Tailwind RTL plugin

ESLint plugin for RTL-safe CSS. Catches physical direction properties in Tailwind classes and CSS-in-JS objects, suggesting logical alternatives.

| Before                                 | After                                                 |
| -------------------------------------- | ----------------------------------------------------- |
| ![Broken layout](./assets/before.webp) | ![Fixed layout using the plugin](./assets/after.webp) |

![Demo of auto fixing violations](./assets/demo.gif)

## Install

> You can install [the SKILL](#ai-agent-skill) as well for your AI coding agent.

```bash
npm install --save-dev eslint eslint-plugin-tailwind-rtl
```

## Usage

### Quick start (recommended config)

The recommended config registers the plugin and enables all rules at `"warn"` severity.

```js
// eslint.config.js
import tailwindRtl from "eslint-plugin-tailwind-rtl";

export default [
  // ... other configs ...
  tailwindRtl.configs.recommended,
];
```

This enables both `tailwind/no-physical-classes` and `css-in-js/no-physical-properties` as warnings.

#### Tailwind-only projects

If you don't use CSS-in-JS:

```js
export default [tailwindRtl.configs["recommended-tailwind"]];
```

#### Strict mode (warn → error)

To fail the build instead of warning:

```js
export default [
  tailwindRtl.configs.recommended,
  {
    rules: {
      "tailwind-rtl/tailwind/no-physical-classes": "error",
    },
  },
];
```

## Use Cases

- **Design systems / shared component libraries** -- Build once, consume in both RTL and LTR projects without direction bugs. The plugin catches physical properties at the component source, so downstream consumers don't have to patch broken margins and padding.
- **OSS UI components** -- Ship components that work out of the box for Arabic, Hebrew, Persian, and Urdu users. Avoid the "works in my project" problem when your users have different `dir` setups.
- **Multi-language apps** -- When your app supports both RTL and LTR locales, the plugin prevents direction-specific classes from leaking into shared components.
- **Code review automation** -- Catch RTL regressions before they hit production. ESLint runs in CI and editor extensions, so violations surface immediately.

## Rules

### `tailwind/no-physical-classes`

Disallows physical direction Tailwind classes in favor of logical properties.
Severity: **Warning** by default. Auto-fixable.

```jsx
// ❌ Incorrect
<div className="ml-4 mr-2 pl-3 pr-1 text-left" />

// ✅ Correct
<div className="ms-4 me-2 ps-3 pe-1 text-start" />
```

**Supported categories:**

| Category      | Physical                                                                         | Logical                                                                          |
| ------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Margin        | `ml-*`, `mr-*`                                                                   | `ms-*`, `me-*`                                                                   |
| Padding       | `pl-*`, `pr-*`                                                                   | `ps-*`, `pe-*`                                                                   |
| Position      | `left-*`, `right-*`                                                              | `start-*`, `end-*`                                                               |
| Text align    | `text-left`, `text-right`                                                        | `text-start`, `text-end`                                                         |
| Border        | `border-l`, `border-r`                                                           | `border-s`, `border-e`                                                           |
| Border radius | `rounded-l`, `rounded-r`, `rounded-tl`, `rounded-tr`, `rounded-bl`, `rounded-br` | `rounded-s`, `rounded-e`, `rounded-ts`, `rounded-te`, `rounded-bs`, `rounded-be` |

### `css-in-js/no-physical-properties`

Disallows physical direction CSS-in-JS properties in favor of logical properties.
Severity: **Warning** by default. Auto-fixable.

```js
// ❌ Incorrect
const styles = { marginLeft: "1rem", paddingRight: "2rem" };

// ✅ Correct
const styles = { marginInlineStart: "1rem", paddingInlineEnd: "2rem" };
```

**Supported properties:**

| Category     | Physical                                         | Logical                                                          |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------- |
| Margin       | `marginLeft`, `marginRight`                      | `marginInlineStart`, `marginInlineEnd`                           |
| Padding      | `paddingLeft`, `paddingRight`                    | `paddingInlineStart`, `paddingInlineEnd`                         |
| Border       | `borderLeft`, `borderRight`                      | `borderInlineStart`, `borderInlineEnd`                           |
| Border color | `borderLeftColor`, `borderRightColor`            | `borderInlineStartColor`, `borderInlineEndColor`                 |
| Border width | `borderLeftWidth`, `borderRightWidth`            | `borderInlineStartWidth`, `borderInlineEndWidth`                 |
| Border style | `borderLeftStyle`, `borderRightStyle`            | `borderInlineStartStyle`, `borderInlineEndStyle`                 |
| Position     | `left`, `right`                                  | `insetInlineStart`, `insetInlineEnd`                             |
| Size         | `width`, `height`                                | `inlineSize`, `blockSize`                                        |
| Min/max size | `minWidth`, `maxWidth`, `minHeight`, `maxHeight` | `minInlineSize`, `maxInlineSize`, `minBlockSize`, `maxBlockSize` |

### `css-in-js/no-physical-values`

Disallows physical direction values (`"left"`, `"right"`) in CSS-in-JS properties that accept directional keywords.
Severity: **Warning** by default. Auto-fixable.

```js
// ❌ Incorrect
const styles = { textAlign: "left", float: "right", clear: "left" };

// ✅ Correct
const styles = {
  textAlign: "start",
  float: "inline-end",
  clear: "inline-start",
};
```

**Supported properties and values:**

| Property    | Physical Value | Logical Value    |
| ----------- | -------------- | ---------------- |
| `textAlign` | `"left"`       | `"start"`        |
| `textAlign` | `"right"`      | `"end"`          |
| `float`     | `"left"`       | `"inline-start"` |
| `float`     | `"right"`      | `"inline-end"`   |
| `clear`     | `"left"`       | `"inline-start"` |
| `clear`     | `"right"`      | `"inline-end"`   |

## Configs

| Config                 | Rules enabled                                      |
| ---------------------- | -------------------------------------------------- |
| `recommended`          | Tailwind + CSS-in-JS properties + CSS-in-JS values |
| `recommended-tailwind` | Tailwind only                                      |

## AI Agent Skill

### Linting Skill (this package)

This package includes a [SKILL.md](https://skills.sh) that teaches AI coding assistants the same property mappings the ESLint plugin enforces. Install it alongside the plugin so agents generate RTL-safe code from the start:

```bash
npx skills add AmmarCodes/eslint-plugin-tailwind-rtl
```

### RTL Web Development Skill (companion)

For the full RTL development picture -- Arabic typography, bidirectional text handling, component patterns, `dir` attribute, flexbox auto-flip, icon handling, and more -- install the [companion skill](https://github.com/AmmarCodes/rtl-web-development-skill):

```bash
npx skills add AmmarCodes/rtl-web-development
```

### Defense in Depth

| Tool                                                                                           | When it helps    | What it does                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------- |
| **Linting Skill** (this package)                                                               | Code generation  | Prevents RTL bugs before they're written                            |
| **RTL Web Development Skill** ([companion](https://github.com/AmmarCodes/rtl-web-development)) | Code generation  | Full RTL guidance: bidi text, Arabic typography, component patterns |
| **ESLint Plugin** (this package)                                                               | Code review / CI | Catches RTL regressions in existing code                            |

## Contributing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

Tests use Node.js built-in test runner (no extra test framework required).

## License

MIT
