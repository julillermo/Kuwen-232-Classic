// The following line is needed to use EmotionCSS like I do with work
/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";

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
      <p
        css={{
          fontSize: 36,
          fontWeight: 700,
          margin: 0,
          textAlign: "center",
        }}
      >
        <span css={{ color: "#10b1fe" }}>Kuwen</span>
        <span css={{ color: "#5c96fc" }}>-232</span>
      </p>
    </div>
  );
}

export default App;
