export function darkenHexColor(hexColor, amount = 10) {
  let r: number | string = parseInt(hexColor.substring(1, 3), 16);
  let g: number | string = parseInt(hexColor.substring(3, 5), 16);
  let b: number | string = parseInt(hexColor.substring(5, 7), 16);

  r = Math.min(r, Math.round(r - r * (amount / 100)));
  g = Math.min(g, Math.round(g - g * (amount / 100)));
  b = Math.min(b, Math.round(b - b * (amount / 100)));

  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

export function lightenHexColor(hexColor, amount = 10) {
  let r: number | string = parseInt(hexColor.substring(1, 3), 16);
  let g: number | string = parseInt(hexColor.substring(3, 5), 16);
  let b: number | string = parseInt(hexColor.substring(5, 7), 16);

  r = Math.min(255, Math.round(r + r * (amount / 100)));
  g = Math.min(255, Math.round(g + g * (amount / 100)));
  b = Math.min(255, Math.round(b + b * (amount / 100)));

  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}
