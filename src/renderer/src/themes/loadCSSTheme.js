// run with node
const fs = require('fs')
const path = require('path')

const themeName = "bluloco-dark-italic-color-theme.json";

const theme = JSON.parse(fs.readFileSync(path.join(__dirname,`/${themeName}`), "utf8"));
// console.log(theme["colors"]["editor.background"]);

const globalCSS = `\
html, body{
  margin: 0 0 0 0;
  padding: 0 0 0 0;

  background-color: ${theme["colors"]["editor.background"]};
  color: ${theme["colors"]["editor.foreground"]};
}
`;
fs.writeFileSync(path.join(__dirname, "../global.css"), globalCSS);
