/** @jsxImportSource @emotion/react */
import mime from "mime";
import { useEffect, useRef, useState } from "react";
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
import { fileSystemIPC } from "./types/globalNamesAddition";
import { darkenHexColor } from "./utils/color";
const { fileSystem } = window;

type TextInputState = "valid" | "invalid" | "empty";

function App() {
  const defaultTimeLabelInputMethod = { ".text file": "file" };

  const [epubInputType, setEpubInputType] = useState<string>("folder"); // "file" | "folder"
  const [epubPath, setEpubPath] = useState("");
  const [epubInputState, setEpubInputState] = useState<TextInputState>("empty");

  const [audioFilePath, setAudioFilePath] = useState("");
  const [audioFileInputState, setAudioFileInputState] =
    useState<TextInputState>("empty");

  const [timeLabelInputMethod, setTimeLabelInputMethod] = useState<RadioOption>(
    defaultTimeLabelInputMethod
  );
  const [timeLabelsFilePath, SetTimeLabelsFilePath] = useState("");
  const [timeLabelsFileInputState, setTimeLabelsFileInputState] =
    useState<TextInputState>("empty");

  const timeLabelsFilePathRef = useRef("");
  const [disabledTxtTimeLabelUI, setDisabledTxtTimeLabelUI] = useState(false);
  const [manualTimeLabelsTxt, setManualTimeLabelsTxt] = useState("");
  const manualTimeLabelsRef = useRef("");

  const [showAddFnToggle, setShowAddFnToggle] = useState(false);

  useEffect(() => {
    if (Object.values(timeLabelInputMethod)[0] == "manual") {
      setDisabledTxtTimeLabelUI(true);
      timeLabelsFilePathRef.current = timeLabelsFilePath;

      SetTimeLabelsFilePath("");
      setManualTimeLabelsTxt(manualTimeLabelsRef.current);
    } else if (Object.values(timeLabelInputMethod)[0] == "file") {
      setDisabledTxtTimeLabelUI(false);
      manualTimeLabelsRef.current = manualTimeLabelsTxt;

      setManualTimeLabelsTxt("");
      SetTimeLabelsFilePath(timeLabelsFilePathRef.current);
    }
  }, [timeLabelInputMethod]);

  useEffect(() => {
    epubFilePathValidation(epubPath);
    audioFilePathValidation(audioFilePath);
    timeLabelsFilePathValidation(timeLabelsFilePath);
  }, [
    epubInputType,
    epubPath,
    audioFilePath,
    timeLabelInputMethod,
    timeLabelsFilePath,
  ]);

  async function handleSetEpubPath() {
    if (epubInputType === "file") {
      const epubPath = await fileSystem.selectEpubPath();
      setEpubPath(epubPath);
    } else if (epubInputType === "folder") {
      const epubPath = await fileSystem.openDirectory();
      setEpubPath(epubPath);
    }
  }
  async function epubFilePathValidation(filePath: string) {
    if (filePath.length > 0) {
      if (epubInputType === "file") {
        let isFile;
        try {
          isFile = await fileSystem.isFile(filePath);
        } catch (err: unknown) {
          isFile = false;
        }
        const isEpub = mime.getType(filePath) === "application/epub+zip";

        if (isFile && isEpub) {
          setEpubInputState("valid");
        } else {
          setEpubInputState("invalid");
        }
      } else if (epubInputType === "folder") {
        let isDirectory;
        try {
          isDirectory = await fileSystem.isDirectory(filePath);
        } catch (err: unknown) {
          isDirectory = false;
        }

        if (isDirectory) {
          setEpubInputState("valid");
        } else {
          setEpubInputState("invalid");
        }
      }
    } else {
      setEpubInputState("empty");
    }
  }
  async function handleSetAudioFilePath() {
    const audioFilePath = await fileSystem.selectAudioFilePath();
    setAudioFilePath(audioFilePath);
  }
  async function audioFilePathValidation(filePath: string) {
    if (filePath.length > 0) {
      let isFile;
      try {
        isFile = await fileSystem.isFile(filePath);
      } catch (err: unknown) {
        isFile = false;
      }
      const isMp3 = mime.getType(filePath) === "audio/mpeg";

      if (isFile && isMp3) {
        setAudioFileInputState("valid");
      } else {
        setAudioFileInputState("invalid");
      }
    } else {
      setAudioFileInputState("empty");
    }
  }
  async function handleSetTimeLabelsFilePath() {
    const timeLabelsFilePath = await fileSystem.openFile();
    SetTimeLabelsFilePath(timeLabelsFilePath);
  }
  async function timeLabelsFilePathValidation(filePath: string) {
    if (filePath.length > 0) {
      let isFile;
      try {
        isFile = await fileSystem.isFile(filePath);
      } catch (err: unknown) {
        isFile = false;
      }
      const isTxt = mime.getType(filePath) === "text/plain";

      if (isFile && isTxt) {
        setTimeLabelsFileInputState("valid");
      } else {
        setTimeLabelsFileInputState("invalid");
      }
    } else {
      setTimeLabelsFileInputState("empty");
    }
  }
  function clearFilePaths() {
    setEpubPath("");
    setAudioFilePath("");
    SetTimeLabelsFilePath("");
    setManualTimeLabelsTxt("");
    timeLabelsFilePathRef.current = "";
    manualTimeLabelsRef.current = "";
  }
  function handleShowAddFnToggle() {
    showAddFnToggle ? setShowAddFnToggle(false) : setShowAddFnToggle(true);
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
                onChange={setEpubPath}
                validationFn={epubFilePathValidation}
                toggleInvalidStyling={
                  epubInputState === "invalid" ? true : false
                }
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
              <TextInput
                value={audioFilePath}
                onChange={setAudioFilePath}
                validationFn={audioFilePathValidation}
                toggleInvalidStyling={
                  audioFileInputState === "invalid" ? true : false
                }
                showHover={true}
              />
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
                  onChange={SetTimeLabelsFilePath}
                  validationFn={timeLabelsFilePathValidation}
                  toggleInvalidStyling={
                    timeLabelsFileInputState === "invalid" ? true : false
                  }
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
                <TextArea
                  value={manualTimeLabelsTxt}
                  onChange={setManualTimeLabelsTxt}
                  disabled={!disabledTxtTimeLabelUI}
                />
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
              <Typography onClick={handleShowAddFnToggle}>
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
    fileSystem: fileSystemIPC;
  }
}
