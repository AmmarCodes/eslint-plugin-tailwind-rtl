---
name: rtl-css
description: |
  RTL-safe CSS and Tailwind code generation. Use this skill whenever the user asks for CSS styling, Tailwind classes, component styling, layout code, margin/padding/positioning, border styling, or any UI code that involves directional properties. This applies whether writing plain CSS, CSS-in-JS (styled-components, Emotion, inline styles), Tailwind utility classes, or any framework-specific styling. Always prefer logical properties and values over physical left/right directions to ensure components work correctly in both LTR and RTL languages (Arabic, Hebrew, Persian, Urdu, etc.).
---

# RTL-Safe CSS Code Generation

## Core Principle

Physical direction properties (`left`, `right`, `margin-left`, `padding-right`, etc.) assume left-to-right (LTR) text direction. When a component is rendered in a right-to-left (RTL) language, these properties break layouts.

**Logical properties** solve this by referring to the text flow direction:

- **Inline axis**: The direction text flows (left-to-right in English, right-to-left in Arabic)
- **Block axis**: The direction perpendicular to text flow (top-to-bottom in both)
- **Start**: The beginning of the inline axis (left in LTR, right in RTL)
- **End**: The end of the inline axis (right in LTR, left in RTL)

> **Golden rule**: If you write `left` or `right`, you're probably making an RTL bug. Use `inline-start`/`inline-end` or `start`/`end` instead.

## When This Skill Applies

Apply these rules when generating:

- Tailwind CSS utility classes
- Plain CSS rules
- CSS-in-JS objects (styled-components, Emotion, inline styles, CSS modules)
- Component library styles
- Design system tokens
- Any code involving margin, padding, borders, positioning, text alignment, or sizing

## Tailwind CSS: Physical to Logical Classes

See `references/mappings.md` for the complete reference table. Common substitutions:

| Physical       | Logical        | Meaning                    |
| -------------- | -------------- | -------------------------- |
| `ml-*`         | `ms-*`         | margin-inline-start        |
| `mr-*`         | `me-*`         | margin-inline-end          |
| `pl-*`         | `ps-*`         | padding-inline-start       |
| `pr-*`         | `pe-*`         | padding-inline-end         |
| `left-*`       | `start-*`      | inset-inline-start         |
| `right-*`      | `end-*`        | inset-inline-end           |
| `text-left`    | `text-start`   | text-align: start          |
| `text-right`   | `text-end`     | text-align: end            |
| `border-l`     | `border-s`     | border-inline-start        |
| `border-r`     | `border-e`     | border-inline-end          |
| `rounded-l-*`  | `rounded-s-*`  | border-start-radius        |
| `rounded-r-*`  | `rounded-e-*`  | border-end-radius          |
| `rounded-tl-*` | `rounded-ts-*` | border-top-start-radius    |
| `rounded-tr-*` | `rounded-te-*` | border-top-end-radius      |
| `rounded-bl-*` | `rounded-bs-*` | border-bottom-start-radius |
| `rounded-br-*` | `rounded-be-*` | border-bottom-end-radius   |

**Examples:**

```jsx
// ❌ Bad — breaks in RTL
<div className="ml-4 mr-2 pl-3 pr-1 text-left rounded-l-lg" />

// ✅ Good — works in both LTR and RTL
<div className="ms-4 me-2 ps-3 pe-1 text-start rounded-s-lg" />
```

```jsx
// ❌ Bad
<div className="absolute left-0 right-0" />

// ✅ Good
<div className="absolute start-0 end-0" />
```

## Plain CSS & CSS-in-JS: Physical to Logical Properties

See `references/mappings.md` for the complete reference table. Common substitutions:

| Physical             | Logical                     |
| -------------------- | --------------------------- |
| `margin-left`        | `margin-inline-start`       |
| `margin-right`       | `margin-inline-end`         |
| `padding-left`       | `padding-inline-start`      |
| `padding-right`      | `padding-inline-end`        |
| `border-left`        | `border-inline-start`       |
| `border-right`       | `border-inline-end`         |
| `border-left-color`  | `border-inline-start-color` |
| `border-right-color` | `border-inline-end-color`   |
| `border-left-width`  | `border-inline-start-width` |
| `border-right-width` | `border-inline-end-width`   |
| `border-left-style`  | `border-inline-start-style` |
| `border-right-style` | `border-inline-end-style`   |
| `left`               | `inset-inline-start`        |
| `right`              | `inset-inline-end`          |
| `width`              | `inline-size`               |
| `height`             | `block-size`                |
| `min-width`          | `min-inline-size`           |
| `max-width`          | `max-inline-size`           |
| `min-height`         | `min-block-size`            |
| `max-height`         | `max-block-size`            |

**Examples:**

```css
/* ❌ Bad */
.sidebar {
  margin-left: 1rem;
  padding-right: 2rem;
  border-left: 1px solid #ccc;
  left: 0;
  width: 200px;
  text-align: left;
}

/* ✅ Good */
.sidebar {
  margin-inline-start: 1rem;
  padding-inline-end: 2rem;
  border-inline-start: 1px solid #ccc;
  inset-inline-start: 0;
  inline-size: 200px;
  text-align: start;
}
```

```js
// ❌ Bad
const styles = {
  marginLeft: "1rem",
  paddingRight: "2rem",
  borderLeft: "1px solid red",
  left: "0",
  width: "200px",
};

// ✅ Good
const styles = {
  marginInlineStart: "1rem",
  paddingInlineEnd: "2rem",
  borderInlineStart: "1px solid red",
  insetInlineStart: "0",
  inlineSize: "200px",
};
```

## Value-Level Directional Keywords

Some CSS properties accept directional keywords as values. Use logical values:

| Property     | ❌ Physical     | ✅ Logical                   |
| ------------ | --------------- | ---------------------------- |
| `text-align` | `left`, `right` | `start`, `end`               |
| `float`      | `left`, `right` | `inline-start`, `inline-end` |
| `clear`      | `left`, `right` | `inline-start`, `inline-end` |

```css
/* ❌ Bad */
.text-label {
  text-align: left;
}
.pull-quote {
  float: right;
}

/* ✅ Good */
.text-label {
  text-align: start;
}
.pull-quote {
  float: inline-end;
}
```

## Thinking in Logical Terms

When designing layouts, think about the **inline** and **block** axes rather than left/right/top/bottom:

- **Inline axis**: Where text flows horizontally. In LTR: left→right. In RTL: right→left.
- **Block axis**: Where blocks stack vertically. Always top→bottom.
- **Start**: The beginning edge of the inline axis.
- **End**: The ending edge of the inline axis.

This mental model makes your components naturally direction-aware.

## Edge Cases and Exceptions

### When physical properties are acceptable

1. **Absolute positioning for decorative elements** that must stay in a specific corner regardless of text direction (e.g., a background watermark, a specific corner badge).
2. **Icons that have inherent directionality** (arrows, chevrons) — though even then, consider flipping them via `transform: scaleX(-1)` in RTL rather than hardcoding positions.
3. **Shadow directions** — `box-shadow` offset values are not logical and may need manual adjustment per locale.

### Gotchas

1. **CSS Logical Properties require modern browsers**. For projects supporting very old browsers (IE11), you may need fallback strategies. However, all modern browsers support logical properties.
2. **`top` and `bottom` are usually fine** — they map to the block axis. In most cases `top` stays `top` and `bottom` stays `bottom` because the block axis doesn't flip between LTR and RTL. Use `block-start`/`block-end` only when you specifically mean the logical block axis.
3. **`transform` and `clip-path`** use coordinate systems that don't automatically adapt to text direction.
4. **Flexbox `row` and `column`** — `flex-direction: row` flows in the inline direction, so it automatically adapts. `flex-direction: row-reverse` reverses the visual order but still respects the inline axis direction.

## Design System Recommendations

When building design systems or shared component libraries:

1. **Ban physical directional tokens** — Don't expose `marginLeft` or `paddingRight` in your design tokens. Use `marginInlineStart`, `paddingInlineEnd`, etc.
2. **Document logical thinking** — Train your team to think in inline/block/start/end terms.
3. **Use ESLint** — Consider using `eslint-plugin-tailwind-rtl` to catch physical directions automatically.
4. **Test with RTL** — Toggle `dir="rtl"` in your Storybook or dev environment and verify layouts.

## Companion Skill

For the full RTL development picture -- Arabic typography, bidirectional text, component patterns, `dir` attribute, flexbox auto-flip, icon handling, and more -- install the [rtl-web-development](https://github.com/AmmarCodes/rtl-web-development) skill:

```bash
npx skills add AmmarCodes/rtl-web-development
```

## Quick Reference Checklist

Before finalizing any CSS or Tailwind code:

- [ ] No `ml-*` / `mr-*` — use `ms-*` / `me-*`
- [ ] No `pl-*` / `pr-*` — use `ps-*` / `pe-*`
- [ ] No `left-*` / `right-*` (Tailwind) — use `start-*` / `end-*`
- [ ] No `left` / `right` (CSS) — use `inset-inline-start` / `inset-inline-end`
- [ ] No `text-left` / `text-right` — use `text-start` / `text-end`
- [ ] No `border-l` / `border-r` — use `border-s` / `border-e`
- [ ] No `rounded-l-*` / `rounded-r-*` — use `rounded-s-*` / `rounded-e-*`
- [ ] No `marginLeft` / `marginRight` — use `marginInlineStart` / `marginInlineEnd`
- [ ] No `paddingLeft` / `paddingRight` — use `paddingInlineStart` / `paddingInlineEnd`
- [ ] No `width` / `height` — prefer `inline-size` / `block-size`
- [ ] No `textAlign: "left"` / `textAlign: "right"` — use `"start"` / `"end"`
- [ ] No `float: "left"` / `float: "right"` — use `"inline-start"` / `"inline-end"`
- [ ] No `clear: "left"` / `clear: "right"` — use `"inline-start"` / `"inline-end"`

For the complete mapping tables, see `references/mappings.md`.
