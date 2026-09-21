const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '../../frontend/frontend/src/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace('/* /* RESTAURANT DETAILS 2-COLUMN VIEW & RIGHT SHOWCASE SIDEBAR */', '/* RESTAURANT DETAILS 2-COLUMN VIEW & RIGHT SHOWCASE SIDEBAR');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed nested comment in style.css');
