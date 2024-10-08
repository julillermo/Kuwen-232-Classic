const fs = require("fs"); // eslint-disable-line
const path = require("path"); // eslint-disable-line

// Also specify the theme in 'themeColors.ts'
const themeName = "bluloco-dark-italic-color-theme.json"; // bluloco dark theme
// const themeName = "bluloco-light-italic-color-theme.json"; // bluloco theme

const theme = JSON.parse(
  fs.readFileSync(path.join(__dirname, `/${themeName}`), "utf8")
);
const colors = theme["colors"];

// global.css
const globalCSS = `\
@font-face {
  font-family: "Comic Neue";
  src: url("./assets/fonts/Comic_Neue/ComicNeue-Regular.ttf");
}

html, body{
  margin: 0 0 0 0;
  padding: 0 0 0 0;

  background-color: ${colors["editor.background"]};
  color: ${colors["editor.foreground"]};

  font-family: "Comic Neue";
}

input, textarea {
  font-family: "Comic Neue";
}
`;
fs.writeFileSync(path.join(__dirname, "../../global.css"), globalCSS);
