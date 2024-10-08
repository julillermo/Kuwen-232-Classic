/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import { setHexTransparency } from "../utils/color";

type TextAreaProps = {
  disabled: boolean;
};

export default function TextArea({ disabled }: TextAreaProps) {
  return (
    <div
      css={{
        marginRight: "20px",
      }}
    >
      <textarea
        disabled={disabled}
        placeholder="Paste the tab-separated time label values here"
        css={[
          {
            width: "100%",
            minWidth: "740px",
            height: "160px",

            outline: "none",

            resize: "vertical",
            borderRadius: "12px",
            padding: "10px 10px",

            fontSize: "14px",
            fontWeight: "normal",
            color: themeColors.background,
          },
          disabled && {
            backgroundColor: setHexTransparency(themeColors.foreground, 0.5),
            color: setHexTransparency(themeColors.foreground, 0),
          },
        ]}
      ></textarea>
    </div>
  );
}
