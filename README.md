# eslint-plugin-tailwind-rtl

ESLint plugin for RTL-safe Tailwind CSS. Catches physical direction classes and suggests logical alternatives.

## Install

```bash
npm install --save-dev eslint eslint-plugin-tailwind-rtl
```

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
Severity: **Warning** by default.

```jsx
// ❌ Incorrect
<div className="ml-4 mr-2 pl-3 pr-1 text-left" />

// ✅ Correct
<div className="ms-4 me-2 ps-3 pe-1 text-start" />
```

Auto-fixable.

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

## Supported mappings

See `src/maps/tailwind.js` for the complete physical-to-logical mappings.

## License

MIT
