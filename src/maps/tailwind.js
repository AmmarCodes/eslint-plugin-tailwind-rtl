const TAILWIND_MARGIN = {
  ml: "ms",
  mr: "me",
};

const TAILWIND_PADDING = {
  pl: "ps",
  pr: "pe",
};

const TAILWIND_POSITION = {
  left: "start",
  right: "end",
};

const TAILWIND_TEXT_ALIGN = {
  "text-left": "text-start",
  "text-right": "text-end",
};

const TAILWIND_BORDER_RADIUS = {
  "rounded-l": "rounded-s",
  "rounded-r": "rounded-e",
  "rounded-tl": "rounded-ts",
  "rounded-tr": "rounded-te",
  "rounded-bl": "rounded-bs",
  "rounded-br": "rounded-be",
};

const TAILWIND_BORDER = {
  "border-l": "border-s",
  "border-r": "border-e",
};

function buildTailwindMap() {
  const map = new Map();

  for (const [physical, logical] of Object.entries(TAILWIND_MARGIN)) {
    map.set(physical, logical);
  }

  for (const [physical, logical] of Object.entries(TAILWIND_PADDING)) {
    map.set(physical, logical);
  }

  for (const [physical, logical] of Object.entries(TAILWIND_POSITION)) {
    map.set(physical, logical);
  }

  for (const [physical, logical] of Object.entries(TAILWIND_BORDER_RADIUS)) {
    map.set(physical, logical);
  }

  for (const [physical, logical] of Object.entries(TAILWIND_BORDER)) {
    map.set(physical, logical);
  }

  for (const [physical, logical] of Object.entries(TAILWIND_TEXT_ALIGN)) {
    map.set(physical, logical);
  }

  return map;
}

const tailwindMap = buildTailwindMap();
const physicalPrefixes = Array.from(tailwindMap.keys());

module.exports = {
  tailwindMap,
  physicalPrefixes,
  TAILWIND_MARGIN,
  TAILWIND_PADDING,
  TAILWIND_POSITION,
  TAILWIND_TEXT_ALIGN,
  TAILWIND_BORDER_RADIUS,
  TAILWIND_BORDER,
};
