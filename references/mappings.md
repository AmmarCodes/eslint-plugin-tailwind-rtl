# Complete RTL CSS Mappings

## Tailwind CSS Classes

### Margin

| Physical | Logical | Example         |
| -------- | ------- | --------------- |
| `ml-*`   | `ms-*`  | `ml-4` → `ms-4` |
| `mr-*`   | `me-*`  | `mr-2` → `me-2` |

### Padding

| Physical | Logical | Example         |
| -------- | ------- | --------------- |
| `pl-*`   | `ps-*`  | `pl-3` → `ps-3` |
| `pr-*`   | `pe-*`  | `pr-1` → `pe-1` |

### Position (inset)

| Physical  | Logical   | Example              |
| --------- | --------- | -------------------- |
| `left-*`  | `start-*` | `left-0` → `start-0` |
| `right-*` | `end-*`   | `right-4` → `end-4`  |

### Text Alignment

| Physical     | Logical      | Example                    |
| ------------ | ------------ | -------------------------- |
| `text-left`  | `text-start` | `text-left` → `text-start` |
| `text-right` | `text-end`   | `text-right` → `text-end`  |

### Border

| Physical   | Logical    | Example                 |
| ---------- | ---------- | ----------------------- |
| `border-l` | `border-s` | `border-l` → `border-s` |
| `border-r` | `border-e` | `border-r` → `border-e` |

### Border Radius

| Physical       | Logical        | Example                           |
| -------------- | -------------- | --------------------------------- |
| `rounded-l-*`  | `rounded-s-*`  | `rounded-l-lg` → `rounded-s-lg`   |
| `rounded-r-*`  | `rounded-e-*`  | `rounded-r-md` → `rounded-e-md`   |
| `rounded-tl-*` | `rounded-ts-*` | `rounded-tl-lg` → `rounded-ts-lg` |
| `rounded-tr-*` | `rounded-te-*` | `rounded-tr-lg` → `rounded-te-lg` |
| `rounded-bl-*` | `rounded-bs-*` | `rounded-bl-lg` → `rounded-bs-lg` |
| `rounded-br-*` | `rounded-be-*` | `rounded-br-lg` → `rounded-be-lg` |

---

## CSS Properties (Plain CSS & CSS-in-JS)

### Margin

| Physical       | Logical               |
| -------------- | --------------------- |
| `margin-left`  | `margin-inline-start` |
| `margin-right` | `margin-inline-end`   |

### Padding

| Physical        | Logical                |
| --------------- | ---------------------- |
| `padding-left`  | `padding-inline-start` |
| `padding-right` | `padding-inline-end`   |

### Border

| Physical             | Logical                     |
| -------------------- | --------------------------- |
| `border-left`        | `border-inline-start`       |
| `border-right`       | `border-inline-end`         |
| `border-left-color`  | `border-inline-start-color` |
| `border-right-color` | `border-inline-end-color`   |
| `border-left-width`  | `border-inline-start-width` |
| `border-right-width` | `border-inline-end-width`   |
| `border-left-style`  | `border-inline-start-style` |
| `border-right-style` | `border-inline-end-style`   |

### Position

| Physical | Logical              |
| -------- | -------------------- |
| `left`   | `inset-inline-start` |
| `right`  | `inset-inline-end`   |

### Size

| Physical     | Logical           |
| ------------ | ----------------- |
| `width`      | `inline-size`     |
| `height`     | `block-size`      |
| `min-width`  | `min-inline-size` |
| `max-width`  | `max-inline-size` |
| `min-height` | `min-block-size`  |
| `max-height` | `max-block-size`  |

---

## CSS Value-Level Mappings

Some properties accept directional keywords as values:

| Property     | Physical Value | Logical Value  |
| ------------ | -------------- | -------------- |
| `text-align` | `left`         | `start`        |
| `text-align` | `right`        | `end`          |
| `float`      | `left`         | `inline-start` |
| `float`      | `right`        | `inline-end`   |
| `clear`      | `left`         | `inline-start` |
| `clear`      | `right`        | `inline-end`   |

### CSS-in-JS Property Names for Values

| Physical             | Logical                 |
| -------------------- | ----------------------- |
| `textAlign: "left"`  | `textAlign: "start"`    |
| `textAlign: "right"` | `textAlign: "end"`      |
| `float: "left"`      | `float: "inline-start"` |
| `float: "right"`     | `float: "inline-end"`   |
| `clear: "left"`      | `clear: "inline-start"` |
| `clear: "right"`     | `clear: "inline-end"`   |
