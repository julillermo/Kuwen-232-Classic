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

export default function Typography({ color, children }: TypographyProps) {
  let textColor;
  switch (color) {
    case "background":
      textColor = themeColors.background;
      break;
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

        fontSize: "16px",
        fontWeight: "normal",
      }}
    >
      {children}
    </p>
  );
}
