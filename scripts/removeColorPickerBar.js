const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. In activeThemeClass, make it always auto-change smoothly with promoIndex
const oldThemeClassBlock = `  const activeThemeClass = selectedThemeId === "auto"
    ? dashboardPromos[promoIndex]?.themeClass || "theme-crimson"
    : (colorThemes.find((t) => t.id === selectedThemeId)?.class || "theme-crimson");`;

const newThemeClassBlock = `  const activeThemeClass = dashboardPromos[promoIndex]?.themeClass || "theme-crimson";`;

if (code.includes(oldThemeClassBlock)) {
  code = code.replace(oldThemeClassBlock, newThemeClassBlock);
}

// 2. Remove the entire theme-picker-bar block
const themePickerMarker = '{/* Dynamic Theme / Color Switcher */}';
const startIdx = code.indexOf(themePickerMarker);
if (startIdx !== -1) {
  const endIdx = code.indexOf('</div>\n          </div>\n\n          {/* Hero Copy', startIdx);
  if (endIdx !== -1) {
    code = code.substring(0, startIdx) + code.substring(endIdx + 7); // keeps the closing </div> of dashboard-top-bar
  } else {
    // Regex removal if exact string formatting differs
    code = code.replace(/{\/\* Dynamic Theme \/ Color Switcher \*\/}[\s\S]*?<\/div>\s*(?=<\/div>\s*{\/\* Hero Copy)/, '');
  }
}

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Successfully removed theme-picker-bar from RestaurantDetails.jsx');

// Synchronize backup
const backupPath = path.resolve(__dirname, 'RestaurantDetails.jsx.new');
fs.writeFileSync(backupPath, code, 'utf8');
console.log('Synchronized backup file');
