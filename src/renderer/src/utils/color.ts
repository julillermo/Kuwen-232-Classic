export function darkenHexColor(hexColor, amount = 0.1) {
  let r: number | string = parseInt(hexColor.substring(1, 3), 16);
  let g: number | string = parseInt(hexColor.substring(3, 5), 16);
  let b: number | string = parseInt(hexColor.substring(5, 7), 16);

  r = Math.max(0, r - Math.round(255 * amount));
  g = Math.max(0, g - Math.round(255 * amount));
  b = Math.max(0, b - Math.round(255 * amount));

  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

export function lightenHexColor(hexColor, amount = 0.1) {
  let r: number | string = parseInt(hexColor.substring(1, 3), 16);
  let g: number | string = parseInt(hexColor.substring(3, 5), 16);
  let b: number | string = parseInt(hexColor.substring(5, 7), 16);

  r = Math.min(255, r + Math.round(255 * amount));
  g = Math.min(255, g + Math.round(255 * amount));
  b = Math.min(255, b + Math.round(255 * amount));

  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

export function setHexTransparency(hexColor, amount = 0.9) {
  const a: number | string = Math.min(255, Math.round(255 * amount))
    .toString(16)
    .padStart(2, "0");
  return `${hexColor}${a}`;
}
