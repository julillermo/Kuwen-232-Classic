/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import {
  darkenHexColor,
  lightenHexColor,
  setHexTransparency,
} from "../utils/color";
import DownArrowIcon from "../assets/icons/DownArrowIcon";
import { useState } from "react";
import Typography from "./Typography";

type DropDownOption = {
  [key: string]: string; // {displayText: dropDown_value}
};

type SplitButtonProps = {
  buttonText: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  dropDownOptions: DropDownOption[]; // [{displayText: dropDown_value}, ...]
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  // prefix?: ReactNode;
  // suffix?: ReactNode;
};

export default function SplitButton({
  buttonText,
  onClick,
  type = "button",
  dropDownOptions,
  setSelectedValue,
}: SplitButtonProps) {
  const [optionsVisibility, setOptionsVisibility] = useState<boolean>(false);

  function toggleShowOptions() {
    console.log("entered here");
    switch (optionsVisibility) {
      case false:
        setOptionsVisibility(true);
        break;
      default:
        setOptionsVisibility(false);
        break;
    }
  }

  function handleOptionSelect(optionValue: string) {
    setSelectedValue(optionValue);
    setOptionsVisibility(false);
  }

  return (
    <div
      css={{
        position: "relative",
        borderRadius: "13px 13px 13px 13px",

        "&:hover": {
          boxShadow: `0px 0px 6px 0px ${setHexTransparency(
            themeColors.primary,
            0.7
          )}`,
        },
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          onClick={onClick}
          type={type}
          css={{
            fontFamily: "Comic Neue",
            textWrap: "nowrap",

            borderRadius: "12px 0px 0px 12px",
            padding: "12px 14px",

            border: "none",
            backgroundColor: themeColors.primary,

            cursor: "pointer",
            "&:hover": {
              backgroundColor: lightenHexColor(themeColors.primary, 0.1),
            },

            "&:active": {
              backgroundColor: darkenHexColor(themeColors.primary, 0.1),
            },
          }}
        >
          {buttonText}
        </button>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            width: "2px",
            backgroundColor: themeColors.primary,
          }}
        >
          <div
            css={{
              margin: "6px 0px",
              height: "100%",
              backgroundColor: darkenHexColor(themeColors.primary, 0.1),
            }}
          ></div>
        </div>
        <button
          onClick={toggleShowOptions}
          type={type}
          css={{
            fontFamily: "Comic Neue",
            textWrap: "nowrap",

            borderRadius: optionsVisibility
              ? "0px 12px 0px 0px"
              : "0px 12px 12px 0px",
            padding: "12px 14px",

            apperance: "none",
            border: "none",
            backgroundColor: themeColors.primary,

            cursor: "pointer",
            "&:hover": {
              backgroundColor: lightenHexColor(themeColors.primary, 0.1),
            },

            "&:active": {
              backgroundColor: darkenHexColor(themeColors.primary, 0.1),
            },
          }}
        >
          <DownArrowIcon height={12} width={12} />
        </button>
      </div>
      {optionsVisibility && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",

            textAlign: "right",

            width: "100%",
            position: "absolute",

            backgroundColor: themeColors.primary,
            borderRadius: "12px 0px 12px 12px",
            boxShadow: `0px 0px 6px 0px ${setHexTransparency(
              darkenHexColor(themeColors.primary, 0.4),
              1
            )}`,

            color: themeColors.background,

            marginTop: "2px",
          }}
        >
          {dropDownOptions.map((option) => {
            return (
              <div
                onClick={() => handleOptionSelect(Object.values(option)[0])}
                css={{
                  padding: "4px",

                  borderRadius: getOptionsHoverBorderRadius({
                    index: dropDownOptions.indexOf(option),
                    indexCount: dropDownOptions.length - 1,
                  }),

                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: lightenHexColor(themeColors.primary, 0.1),
                  },
                }}
              >
                <Typography color="background">
                  {Object.keys(option)[0]}
                </Typography>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getOptionsHoverBorderRadius({
  index,
  indexCount,
}: {
  index: number;
  indexCount: number;
}) {
  switch (index) {
    case 0:
      return "12px 0px 0px 0px";
      break;
    case indexCount:
      return "0px 0px 12px 12px";
  }
}
