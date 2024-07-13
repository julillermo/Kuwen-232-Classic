// change the imported file as necessary
import theme from "./bluloco-dark-italic-color-theme.json"; // bluloco theme
// import theme from "./nord-color-theme.json"; // nord theme

export type ThemeColors = {
  background: string;
  foreground: string;
  foregroundAlt: string;
  keyword: string;
  primary: string;
  secondary: string;
  alert: string;
  alt: string;
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
};
