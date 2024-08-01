/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { themeColors } from "./assets/themes/themeColors";
import AppTitle from "./components/AppTitle";
import Button from "./components/Button";
import HorizontalRadioSelect, {
  RadioOption,
} from "./components/HorizontalRadioSelect";
import SplitButton from "./components/SplitButton";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";
import Typography from "./components/Typography";
import { fileSystemIPC, versionsIPC } from "./types/globalNamesAddition";
import { darkenHexColor } from "./utils/color";
const { fileSystem } = window;

function App() {
  const defaultTimeLabelInputMethod = { ".text file": "file" };

  const [epubInputType, setEpubInputType] = useState<string>("folder");
  const [timeLabelInputMethod, setTimeLabelInputMethod] = useState<RadioOption>(
    defaultTimeLabelInputMethod
  );
  const [disabledTxtTimeLabelUI, setDisabledTxtTimeLabelUI] = useState(false);
  const [showAddFnToggle, setShowAddFnToggle] = useState(false);

  const [epubPath, setEpubPath] = useState("");
  const [audioFilePath, setAudioFilePath] = useState("");
  const [timeLabelsFilePath, SetTimeLabelsFilePath] = useState("");

  useEffect(() => {
    Object.values(timeLabelInputMethod)[0] == "manual"
      ? setDisabledTxtTimeLabelUI(true)
      : setDisabledTxtTimeLabelUI(false);
  }, [timeLabelInputMethod]);

  function handleAddFnToggle() {
    showAddFnToggle ? setShowAddFnToggle(false) : setShowAddFnToggle(true);
  }

  async function handleSetEpubPath() {
    const epubPath = await fileSystem.openFile();
    setEpubPath(epubPath);
  }
  async function handleSetAudioFilePath() {
    const audioFilePath = await fileSystem.openFile();
    setAudioFilePath(audioFilePath);
  }
  async function handleSetTimeLabelsFilePath() {
    const timeLabelsFilePath = await fileSystem.openFile();
    SetTimeLabelsFilePath(timeLabelsFilePath);
  }
  function clearFilePaths() {
    setEpubPath("");
    setAudioFilePath("");
    SetTimeLabelsFilePath("");
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "top",
        margin: "20px",
        padding: 0,
      }}
    >
      <div
        id="header"
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <AppTitle />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            gap: "24px",
          }}
        >
          <p>
            <a
              href="https://github.com/julillermo/Kuwen-232-Classic"
              target="_blank"
            >
              Github
            </a>
          </p>
          <p>Attributions</p>
          <p>About</p>
        </div>
      </div>
      <div css={{ height: "16px" }}></div>
      <div id="body">
        <form
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            id="epub-file-folder-group"
            css={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <Typography color={"secondary"}>
              {/* &emsp; */}
              Path to{" "}
              <u>{epubInputType == "file" ? ".epub file" : "epub folder"}</u>:
            </Typography>
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <TextInput
                value={epubPath}
                showHover={true}
                customCSS={{ flexGrow: 1 }}
              />
              <SplitButton
                onClick={handleSetEpubPath}
                buttonText="Set Path"
                dropDownOptions={[
                  { ".epub file": "file" },
                  { "epub folder": "folder" },
                ]}
                setSelectedValue={setEpubInputType}
              />
            </div>
          </div>
          <div
            id="voice-recording-file-group"
            css={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <Typography color={"secondary"}>
              {/* &emsp; */}
              Path to voice recording <u>audio file</u>:
            </Typography>
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <TextInput value={audioFilePath} showHover={true} />
              <Button text="Set Path" onClick={handleSetAudioFilePath} />
            </div>
          </div>
          <div
            id="time-labels-group"
            css={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <Typography disabled={disabledTxtTimeLabelUI} color={"secondary"}>
              {/* &emsp; */}
              Path to <u>time labels .txt file</u>:
            </Typography>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <div
                id="time-labels-file-input"
                css={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                <TextInput
                  value={timeLabelsFilePath}
                  disabled={disabledTxtTimeLabelUI}
                  showHover={true}
                />
                <HorizontalRadioSelect
                  defaultOption={defaultTimeLabelInputMethod}
                  radioOptions={[
                    { ".text file": "file" },
                    { "manual input": "manual" },
                  ]}
                  selectedOption={timeLabelInputMethod}
                  setSelectedOption={setTimeLabelInputMethod}
                />
                <Button
                  onClick={handleSetTimeLabelsFilePath}
                  disabled={disabledTxtTimeLabelUI}
                  text="Set Path"
                />
              </div>
              <div id="time-labels-manual-input">
                <TextArea disabled={!disabledTxtTimeLabelUI} />
              </div>
            </div>
          </div>
          <div
            id="functions-group"
            css={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              id="additional-functions"
              css={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Typography onClick={handleAddFnToggle}>
                {showAddFnToggle ? "Hide" : "Show"} Additional Functions
              </Typography>
              {showAddFnToggle && (
                <>
                  <Button text="Resync" />
                  <Button text="Match nav.html" />
                </>
              )}
            </div>
            <div
              css={{
                height: "25px",
                width: "1px",
                backgroundColor: darkenHexColor(themeColors.foreground, 0.1),
              }}
            ></div>
            <div
              id="main-process-functions"
              css={{
                display: "flex",
                flexDirection: "row",
                justifySelf: "flex-end",
                gap: "20px",
              }}
            >
              <Button onClick={clearFilePaths} type="reset" text="Clear" />
              <Button text="Process" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

// Adding typing to the added objects in the global names
declare global {
  interface Window {
    versions: versionsIPC;
    fileSystem: fileSystemIPC;
  }
}