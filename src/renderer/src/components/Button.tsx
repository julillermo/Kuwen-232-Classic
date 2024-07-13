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
  console.log(themeColors.primary);
  console.log(darkenHexColor(themeColors.primary, 50));

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
          backgroundColor: lightenHexColor(themeColors.primary, 10),
        },

        "&:active": {
          backgroundColor: darkenHexColor(themeColors.primary, 10),
        },
      }}
    >
      {text}
    </button>
  );
}
