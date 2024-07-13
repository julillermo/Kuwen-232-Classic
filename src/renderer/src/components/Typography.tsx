/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { themeColors } from "../assets/themes/themeColors";

type TypographyProps = {
  color?:
    | "background"
    | "foreground"
    | "foregroundAlt"
    | "keyword"
    | "primary"
    | "secondary"
    | "alert"
    | "alt";
  children: ReactNode;
};

export function Typography({ color, children }: TypographyProps) {
  let textColor;
  switch (color) {
    case "secondary":
      textColor = themeColors.secondary;
      break;
    case "alert":
      textColor = themeColors.alert;
      break;
    default:
      textColor = themeColors.foreground;
  }
  return (
    <p
      css={{
        margin: 0,
        color: textColor,
        fontWeight: 700,
      }}
    >
      {children}
    </p>
  );
}
