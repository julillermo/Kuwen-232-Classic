// The following line is needed to use EmotionCSS like I do with work
/** @jsxImportSource @emotion/react */
import AppTitle from "./components/AppTitle";
import TextInput from "./components/TextInput";
import { Typography } from "./components/Typography";

function App() {
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
            gap: 20,
          }}
        >
          <p>
            <a href="https://github.com/julillermo/Kuwen-232-Classic">Github</a>
          </p>
          <p>Attributions</p>
          <p>About</p>
        </div>
      </div>
      <div css={{ height: "24px" }}></div>
      <div id="body">
        <form
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            id="epub-file-folder-group"
            css={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <Typography color={"secondary"}>
              Path to .epub file | epub folder:
            </Typography>
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <TextInput customCSS={{ flexGrow: 1 }} />
              <select
                css={{
                  fontFamily: "Comic Neue",
                }}
              >
                <option value="epub-file">.epub file</option>
                <option value="epub-folder">epub folder</option>
              </select>
              <button
                css={{
                  fontFamily: "Comic Neue",
                }}
              >
                Set Path
              </button>
            </div>
          </div>
          <div
            id="voice-recording-file-group"
            css={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <Typography color={"secondary"}>
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
              <TextInput />
              <button>Set Path</button>
            </div>
          </div>
          <div
            id="time-labels-group"
            css={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <Typography color={"secondary"}>
              Path to Time labels .txt file:{" "}
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
                <TextInput />
                <button>Set Path</button>
                <button>Manual Input</button>
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
            <button>Resync</button>
            <button>Match nav.html</button>
            <button>Clear</button>
            <button type="submit">Process</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
