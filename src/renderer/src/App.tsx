// The following line is needed to use EmotionCSS like I do with work
/** @jsxImportSource @emotion/react */
import TitleText from "./components/TitleText";

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
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <div
          css={{
            width: 132,
          }}
        >
        </div>
        <TitleText />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            // marginLeft: "auto",
            alignSelf: "center",
            gap: 20,
          }}
        >
          <p><a href="https://github.com/julillermo/Kuwen-232-Classic">Github</a></p>
          <p>Attributions</p>
        </div>
      </div>
    </div>
  );
}

export default App;
