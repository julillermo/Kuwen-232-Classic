/** @jsxImportSource @emotion/react */
import { themeColors } from "../assets/themes/themeColors";
import {
  darkenHexColor,
  lightenHexColor,
  setHexTransparency,
} from "../utils/color";

export type RadioOption = {
  [key: string]: string | number; // {displayText: radio_value}
};
type HorizontalRadioSelectProps = {
  defaultOption: RadioOption;
  radioOptions: RadioOption[]; // [{displayText: radio_value}, ...]
  selectedOption: RadioOption;
  setSelectedOption: React.Dispatch<React.SetStateAction<RadioOption>>;
};

export default function HorizontalRadioSelect({
  defaultOption,
  radioOptions,
  selectedOption,
  setSelectedOption,
}: HorizontalRadioSelectProps) {
  // const [selectedOption, setSelectedOption] = useState(defaultOption);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",

        padding: "4px",
        gap: "6px",

        borderRadius: "12px",
        backgroundColor: darkenHexColor(themeColors.foreground, 0.4),

        "&:hover": {
          boxShadow: `0px 0px 4px 0px ${setHexTransparency(
            themeColors.property,
            0.7
          )}`,
        },
      }}
    >
      {radioOptions.map((option) => {
        return (
          <div
            key={`${radioOptions.indexOf(option)}`}
            onClick={() => {
              setSelectedOption(option);
            }}
            css={[
              {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                padding: "0px 14px",
                borderRadius: "12px",

                color: themeColors.foreground,

                textWrap: "nowrap",
                textAlign: "center",

                cursor: "pointer",
              },

              isSelectedOption(option, selectedOption, defaultOption)
                ? {
                    backgroundColor: themeColors.property,
                    color: themeColors.background,
                    "&:hover": {
                      backgroundColor: lightenHexColor(
                        themeColors.property,
                        0.1
                      ),
                    },
                  }
                : {
                    "&:hover": {
                      backgroundColor: setHexTransparency(
                        lightenHexColor(themeColors.property),
                        0.5
                      ),
                      boxShadow: `0px 0px 12px -4px ${setHexTransparency(
                        themeColors.property,
                        0.7
                      )}`,
                      color: themeColors.background,
                    },
                  },
            ]}
          >
            {Object.keys(option)[0]}
          </div>
        );
      })}
    </div>
  );
}

function isMatchDefault(
  option: RadioOption,
  defaultOption: RadioOption
): boolean {
  const sameKeyAsDefault =
    Object.keys(option)[0] === Object.keys(defaultOption)[0];
  const sameValueAsDefault =
    Object.values(option)[0] === Object.values(defaultOption)[0];
  return sameKeyAsDefault && sameValueAsDefault;
}

function isSelectedOption(
  option: RadioOption,
  selectedOption: RadioOption,
  defaultOption: RadioOption
) {
  if (selectedOption) {
    const sameKeyAsSelected =
      Object.keys(option)[0] === Object.keys(selectedOption)[0];
    const sameValueAsSelected =
      Object.values(option)[0] === Object.values(selectedOption)[0];

    if (sameKeyAsSelected && sameValueAsSelected) {
      return true;
    }
  } else {
    return isMatchDefault(option, defaultOption);
  }
}
