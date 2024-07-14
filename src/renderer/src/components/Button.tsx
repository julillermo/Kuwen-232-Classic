/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import { darkenHexColor, lightenHexColor } from "../utils/color";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  // prefix?: ReactNode;
  // suffix?: ReactNode;
};

export default function Button({ text, type }: ButtonProps) {
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

        "&:hover": {
          backgroundColor: lightenHexColor(themeColors.primary, 0.1),
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
