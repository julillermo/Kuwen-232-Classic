/** @jsxImportSource @emotion/react */
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
import { darkenHexColor } from "./utils/color";
import { DirectoryExistsRes } from "./utils/directoryValidation";
import { FileTypeValidationRes } from "./utils/fileTypeValidation";
const { electron, utils } = window;

function App() {
  const defaultTimeLabelInputMethod = { ".text file": "file" };

  // EPUB FILE
  const [epubInputType, setEpubInputType] = useState<string>("folder"); // "file" | "folder"
  const [epubPath, setEpubPath] = useState("");
  const [epubInputState, setEpubInputState] = useState<
    FileTypeValidationRes | DirectoryExistsRes
  >("emptyPath");

  // AUDIO FILE
  const [audioFilePath, setAudioFilePath] = useState("");
  const [audioFileInputState, setAudioFileInputState] =
    useState<FileTypeValidationRes>("emptyPath");

  // TIME LABELS
  const [timeLabelInputMethod, setTimeLabelInputMethod] = useState<RadioOption>(
    defaultTimeLabelInputMethod
  );
  const [timeLabelsPath, SetTimeLabelsPath] = useState("");
  const [timeLabelsInputState, setTimeLabelsInputState] =
    useState<FileTypeValidationRes>("emptyPath");
  const timeLabelsPathRef = useRef("");
  const [disabledTxtTimeLabelUI, setDisabledTxtTimeLabelUI] = useState(false);
  const [manualTimeLabelsTxt, setManualTimeLabelsTxt] = useState("");
  const manualTimeLabelsRef = useRef("");

  // Aadditional functions
  const [showAddFnToggle, setShowAddFnToggle] = useState(false);

  // time label input change
  useEffect(() => {
    if (Object.values(timeLabelInputMethod)[0] == "manual") {
      setDisabledTxtTimeLabelUI(true);
      timeLabelsPathRef.current = timeLabelsPath;

      SetTimeLabelsPath("");
      setManualTimeLabelsTxt(manualTimeLabelsRef.current);
    } else if (Object.values(timeLabelInputMethod)[0] == "file") {
      setDisabledTxtTimeLabelUI(false);
      manualTimeLabelsRef.current = manualTimeLabelsTxt;

      setManualTimeLabelsTxt("");
      SetTimeLabelsPath(timeLabelsPathRef.current);
    }
  }, [timeLabelInputMethod]);

  // check path validity
  useEffect(() => {
    epubValidationHandler(epubPath, ["epub", "zip"], setEpubInputState);
    filePathValidation(audioFilePath, "mp3", setAudioFileInputState);
    filePathValidation(timeLabelsPath, "txt", setTimeLabelsInputState);
  }, [
    epubInputType,
    epubPath,
    audioFilePath,
    timeLabelInputMethod,
    timeLabelsPath,
  ]);

  // path validation functions
  async function filePathValidation(
    filePath: string,
    targetFileExtensions: string | string[],
    setStateFn: React.Dispatch<React.SetStateAction<FileTypeValidationRes>>
  ) {
    const filePathStatus = await utils.fileTypeValidation({
      filePath,
      targetFileExtensions,
    });
    setStateFn(filePathStatus);
  }
  async function directoryPathValidation(
    filePath: string,
    setStateFn: React.Dispatch<React.SetStateAction<DirectoryExistsRes>>
  ) {
    const directoryPathStatus = await utils.directoryExists({
      directoryPath: filePath,
    });
    setStateFn(directoryPathStatus);
  }
  async function epubValidationHandler(
    path: string,
    targetFileExtensions: string | string[],
    setStateFn: React.Dispatch<
      React.SetStateAction<FileTypeValidationRes | DirectoryExistsRes>
    >
  ) {
    if (epubInputType === "file") {
      filePathValidation(path, targetFileExtensions, setStateFn);
    } else if (epubInputType === "folder") {
      directoryPathValidation(path, setStateFn);
    }
  }

  // file path handling functions
  async function handleSetEpubPath() {
    if (epubInputType === "file") {
      const epubPath = await electron.openFile({
        filters: [{ name: "EPUB", extensions: ["epub", "zip"] }],
      });
      setEpubPath(epubPath);
    } else if (epubInputType === "folder") {
      const epubPath = await electron.openDirectory();
      setEpubPath(epubPath);
    }
  }
  async function handleSetAudioFilePath() {
    const audioFilePath = await electron.openFile({
      filters: [{ name: "MP3", extensions: ["mp3"] }],
    });
    setAudioFilePath(audioFilePath);
  }
  async function handleSetTimeLabelsFilePath() {
    const timeLabelsPath = await electron.openFile({
      filters: [{ name: "TXT Files", extensions: ["txt"] }],
    });
    SetTimeLabelsPath(timeLabelsPath);
  }

  // button functions
  function clearFilePaths() {
    setEpubPath("");
    setAudioFilePath("");
    SetTimeLabelsPath("");
    setManualTimeLabelsTxt("");
    timeLabelsPathRef.current = "";
    manualTimeLabelsRef.current = "";
  }
  function handleShowAddFnToggle() {
    showAddFnToggle ? setShowAddFnToggle(false) : setShowAddFnToggle(true);
  }
  function processEpubFile(filePath: string) {
    console.log("processEpub clicked");
    console.log("filePath", filePath);
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
                validationFn={(path) => {
                  epubValidationHandler(
                    path,
                    ["epub", "zip"],
                    setEpubInputState
                  );
                }}
                toggleInvalidStyling={
                  epubInputState === "invalidPath" ? true : false
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
                validationFn={(path) => {
                  filePathValidation(path, "mp3", setAudioFileInputState);
                }}
                toggleInvalidStyling={
                  audioFileInputState === "invalidPath" ? true : false
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
                  value={timeLabelsPath}
                  onChange={SetTimeLabelsPath}
                  validationFn={(path) => {
                    filePathValidation(path, "txt", setTimeLabelsInputState);
                  }}
                  toggleInvalidStyling={
                    timeLabelsInputState === "invalidPath" ? true : false
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
                  {/* <Button text="Resync" />
                  <Button text="Match nav.html" /> */}
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
              <Button
                onClick={() => processEpubFile(epubPath)}
                text="Process"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
