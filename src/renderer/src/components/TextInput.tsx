/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import { CustomCSSObject } from "../types/emotion";
import { setHexTransparency } from "../utils/color";

type TextInput = {
  disabled?: boolean;
  required?: boolean;
  showHover?: boolean;
  valid?: boolean | null;
  customCSS?: CustomCSSObject;
};

export default function TextInput({
  disabled,
  required,
  showHover = false,
  valid = null,
  customCSS,
}: TextInput) {
  return (
    <input
      type="text"
      disabled={disabled}
      required={required}
      css={[
        showHover && {
          "&:hover": {
            boxShadow: `0px 0px 6px 0px ${setHexTransparency(
              themeColors.secondary,
              0.7
            )}`,
          },
        },
        {
          height: "24px",
          width: "100%",
          borderRadius: "12px",
          padding: "8px 10px",

          fontSize: "14px",
          fontWeight: "normal",
          color: themeColors.background,
          placeholder: "test",

          apperance: "auto",

          border: "none",
          backgroundColor: themeColors.foreground,

          "&:focus": {
            outline: `2px solid ${themeColors.secondary}`,
            boxShadow: "none",
          },

          "&:disabled": {
            outline: "none",
            boxShadow: "none",
            backgroundColor: setHexTransparency(themeColors.foreground, 0.5),
          },

          ...customCSS,
        },
        valid != null &&
          valid === false && {
            outline: `3px solid ${themeColors.alert}`,
            "&:focus": {
              outline: `4px solid ${themeColors.alert}`,
            },
          },
      ]}
    />
  );
}
