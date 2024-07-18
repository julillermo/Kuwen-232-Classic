/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import {
  darkenHexColor,
  lightenHexColor,
  setHexTransparency,
} from "../utils/color";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  // prefix?: ReactNode;
  // suffix?: ReactNode;
};

export default function Button({ text, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      css={{
        fontFamily: "Comic Neue",
        textWrap: "nowrap",

        borderRadius: "12px",
        padding: "12px 14px",

        apperance: "none",
        border: "none",
        backgroundColor: themeColors.primary,

        cursor: "pointer",
        "&:hover": {
          backgroundColor: lightenHexColor(themeColors.primary, 0.1),
          boxShadow: `0px 0px 6px 0px ${setHexTransparency(
            themeColors.primary,
            0.7
          )}`,
        },

        "&:active": {
          backgroundColor: darkenHexColor(themeColors.primary, 0.1),
        },
      }}
    >
      {text}
    </button>
  );
}
