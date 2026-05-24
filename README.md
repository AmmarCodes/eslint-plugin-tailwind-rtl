# eslint-plugin-tailwind-rtl

ESLint plugin for RTL-safe CSS. Catches physical direction properties in Tailwind classes and CSS-in-JS objects, suggesting logical alternatives.

## Install

```bash
npm install --save-dev eslint eslint-plugin-tailwind-rtl
```

## Requirements

- **Node.js** >= 18.0.0
- **ESLint** >= 8.0.0

## Usage

### Flat config (ESLint v9+)

```js
import tailwindRtl from "eslint-plugin-tailwind-rtl";

export default [
  {
    plugins: {
      "tailwind-rtl": tailwindRtl,
    },
    rules: {
      "tailwind-rtl/tailwind/no-physical-classes": "error",
    },
  },
];
```

### eslintrc (legacy)

```json
{
  "plugins": ["tailwind-rtl"],
  "rules": {
    "tailwind-rtl/tailwind/no-physical-classes": "error"
  }
}
```

### Recommended config

```js
import tailwindRtl from "eslint-plugin-tailwind-rtl";
export default [tailwindRtl.configs.recommended];
```

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

## Configs

- **`recommended`** — Enables both `tailwind/no-physical-classes` and `css-in-js/no-physical-properties` as warnings.
- **`recommended-tailwind`** — Enables only `tailwind/no-physical-classes` as a warning. Use this for projects that don't use CSS-in-JS.

### Strict Mode

To make the rule fail your build (error) instead of just warning:

```js
import tailwindRtl from "eslint-plugin-tailwind-rtl";

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

- **Design systems / shared component libraries** — Build once, consume in both RTL and LTR projects without direction bugs. The plugin catches physical properties at the component source, so downstream consumers don't have to patch broken margins and padding.
- **OSS UI components** — Ship components that work out of the box for Arabic, Hebrew, Persian, and Urdu users. Avoid the "works in my project" problem when your users have different `dir` setups.
- **Multi-language apps** — When your app supports both RTL and LTR locales, the plugin prevents direction-specific classes from leaking into shared components.
- **Code review automation** — Catch RTL regressions before they hit production. ESLint runs in CI and editor extensions, so violations surface immediately.

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
