// The following line is needed to use EmotionCSS like I do with work
/** @jsxImportSource @emotion/react */
import AppTitle from "./components/AppTitle";
import Button from "./components/Button";
import TextInput from "./components/TextInput";
import Typography from "./components/Typography";
import SplitButton from "./components/SplitButton";
import { useState } from "react";

function App() {
  const [epubInputType, setEpubInputType] = useState("file");

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
            <a href="https://github.com/julillermo/Kuwen-232-Classic">Github</a>
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
              <u>{epubInputType == "file" ? ".epub file" : "epub folder"}</u>
            </Typography>
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <TextInput showHover={true} customCSS={{ flexGrow: 1 }} />
              <SplitButton
                buttonText="Set Path"
                dropDownOptions={[
                  { ".epub file": "file" },
                  { "epub folder": "folder" },
                ]}
                setSelectedOption={setEpubInputType}
              />
            </div>
          </div>
          <div
            id="voice-recording-file-group"
            css={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <Typography color={"secondary"}>
              {/* &emsp; */}
              Path to Voice Recording audio file:
            </Typography>
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <TextInput showHover={true} />
              <Button text="Set Path" />
            </div>
          </div>
          <div
            id="time-labels-group"
            css={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <Typography color={"secondary"}>
              {/* &emsp; */}
              Path to Time labels .txt file:
            </Typography>
            <div>
              <div
                id="time-labels-file-input"
                css={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                <TextInput showHover={true} />
                <Button text="Set Path" />
                <Button text="Manual Input" />
              </div>
              <div id="time-labels-manual-input">
                <textarea />
              </div>
            </div>
          </div>
          <div
            id="functions-group"
            css={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            <p>Show/Hide Additional functions</p>
            <Button text="Resync" />
            <Button text="Match nav.html" />
            <Button type="reset" text="Clear" />
            <Button type="submit" text="Process" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
