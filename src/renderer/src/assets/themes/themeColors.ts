// change the imported file as necessary
import theme from "./bluloco-dark-italic-color-theme.json"; // bluloco dark theme
// import theme from "./bluloco-light-italic-color-theme.json"; // bluloco theme

export type ThemeColors = {
  background: string;
  foreground: string;
  foregroundAlt: string;
  keyword: string;
  primary: string;
  secondary: string;
  alert: string;
  alt: string;
  alt2: string;
  property: string;
};

export const themeColors: ThemeColors = {
  background: theme.colors["editor.background"],
  foreground: theme.colors["editor.foreground"],
  foregroundAlt: theme.colors["breadcrumb.foreground"],
  keyword: theme.colors["list.highlightForeground"],
  primary: theme.colors["symbolIcon.functionForeground"],
  secondary: theme.colors["symbolIcon.stringForeground"],
  alert: theme.colors["symbolIcon.classForeground"],
  alt: theme.colors["editorInfo.foreground"],
  alt2: theme.colors["editorHint.foreground"],
  property: theme.colors["textPreformat.foreground"],
};

console.log("themeColors", JSON.stringify(themeColors, null, 2));
