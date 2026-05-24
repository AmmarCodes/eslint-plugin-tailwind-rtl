const CSS_IN_JS_PROPERTIES = {
  marginLeft: "marginInlineStart",
  marginRight: "marginInlineEnd",
  paddingLeft: "paddingInlineStart",
  paddingRight: "paddingInlineEnd",
  borderLeft: "borderInlineStart",
  borderRight: "borderInlineEnd",
  borderLeftColor: "borderInlineStartColor",
  borderRightColor: "borderInlineEndColor",
  borderLeftWidth: "borderInlineStartWidth",
  borderRightWidth: "borderInlineEndWidth",
  borderLeftStyle: "borderInlineStartStyle",
  borderRightStyle: "borderInlineEndStyle",
  left: "insetInlineStart",
  right: "insetInlineEnd",
  width: "inlineSize",
  height: "blockSize",
  minWidth: "minInlineSize",
  maxWidth: "maxInlineSize",
  minHeight: "minBlockSize",
  maxHeight: "maxBlockSize",
};

// For future value-level checks (e.g. textAlign: "left", float: "right")
const CSS_IN_JS_VALUES = {
  "float-left": "inline-start",
  "float-right": "inline-end",
};

// Properties whose values use directional keywords (left/right/start/end)
const DIRECTIONAL_VALUE_PROPERTIES = new Set(["textAlign", "float", "clear"]);

const physicalProperties = Object.keys(CSS_IN_JS_PROPERTIES);

module.exports = {
  CSS_IN_JS_PROPERTIES,
  CSS_IN_JS_VALUES,
  DIRECTIONAL_VALUE_PROPERTIES,
  physicalProperties,
};
