const fs = require('fs') // eslint-disable-line
const path = require('path'); // eslint-disable-line

// const __dirname = path.dirname(import.meta.url)
console.log(__dirname)
const themeName = "bluloco-dark-italic-color-theme.json";

const theme = JSON.parse(
  fs.readFileSync(path.join(__dirname, `/${themeName}`), "utf8")
);
console.log(theme["colors"]["editor.background"]);

const globalCSS = `\
@font-face {
  font-famly: "Comic Neue";
  src: url("./assets/fonts/Comic Neue/ComicNeue-Regular.ttf");
}

html, body{
  margin: 0 0 0 0;
  padding: 0 0 0 0;

  background-color: ${theme["colors"]["editor.background"]};
  color: ${theme["colors"]["editor.foreground"]};

  font-family: "Comic Neue";
}
`;
fs.writeFileSync(path.join(__dirname, "../../global.css"), globalCSS);
