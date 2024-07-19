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
  disabled?: boolean;
  // prefix?: ReactNode;
  // suffix?: ReactNode;
};

export default function Button({
  text,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
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

        "&:disabled": {
          backgroundColor: setHexTransparency(themeColors.primary, 0.5),
          boxShadow: "none",
          cursor: "auto",
          color: setHexTransparency(themeColors.background, 0.5),
        },
      }}
    >
      {text}
    </button>
  );
}
