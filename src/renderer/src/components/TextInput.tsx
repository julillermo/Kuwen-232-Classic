/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import { CustomCSSObject } from "../types/emotion";

type TextInput = {
  disabled?: boolean;
  required?: boolean;
  valid?: boolean | null;
  customCSS?: CustomCSSObject;
};

export default function TextInput({
  disabled,
  required,
  valid = null,
  customCSS,
}: TextInput) {
  console.log(valid != null);
  return (
    <input
      type="text"
      disabled={disabled}
      required={required}
      css={[
        {
          width: "100%",
          resize: "vertical",
          borderRadius: "8px",
          padding: "12px 14px",

          fontSize: "14px",
          fontWeight: "normal",
          color: themeColors.background,
          placeholder: "test",

          apperance: "auto",
          boxShadow: "none",
          border: "none",
          backgroundColor: themeColors.foreground,

          "&:focus": {
            outline: `2px solid ${themeColors.secondary}`,
          },

          "&:disabled": {
            backgroundColor: themeColors.foregroundAlt,
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
