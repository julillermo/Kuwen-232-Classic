/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import { CustomCSSObject } from "../types/emotion";
import { setHexTransparency } from "../utils/color";

type TextInput = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  validationFn?: (filePath: string) => void;
  disabled?: boolean;
  required?: boolean;
  showHover?: boolean;
  toggleInvalidStyling?: boolean;
  customCSS?: CustomCSSObject;
};

export default function TextInput({
  value,
  onChange,
  validationFn,
  disabled,
  required,
  showHover = false,
  toggleInvalidStyling = false,
  customCSS,
}: TextInput) {
  return (
    <input
      value={value}
      onChange={(e) => {
        validationFn && validationFn(e.target.value);
        onChange(e.target.value);
      }}
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
          flexGrow: 1,
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
            userSelect: "none",
            outline: "none",
            boxShadow: "none",
            backgroundColor: setHexTransparency(themeColors.foreground, 0.5),
          },

          ...customCSS,
        },
        toggleInvalidStyling === true && {
          outline: `2px solid ${themeColors.alert}`,
          "&:focus": {
            outline: `3px solid ${themeColors.alert}`,
          },
        },
      ]}
    />
  );
}
