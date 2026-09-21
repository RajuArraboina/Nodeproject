const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');
let code = fs.readFileSync(targetPath, 'utf8');

// Update handleSelectTheme to allow toggling or selecting
const oldHandleSelectTheme = `  function handleSelectTheme(themeId) {
    setSelectedThemeId(themeId);
    localStorage.setItem("dashboardTheme", themeId);
  }`;

const newHandleSelectTheme = `  function handleSelectTheme(themeId) {
    const nextTheme = selectedThemeId === themeId ? "auto" : themeId;
    setSelectedThemeId(nextTheme);
    localStorage.setItem("dashboardTheme", nextTheme);
  }`;

if (code.includes(oldHandleSelectTheme)) {
  code = code.replace(oldHandleSelectTheme, newHandleSelectTheme);
}

// Remove the theme-auto-toggle button from theme-picker-bar
const targetButtonBlock = `              <button
                type="button"
                className={\`theme-auto-toggle \${selectedThemeId === "auto" ? "active" : ""}\`}
                onClick={() => handleSelectTheme("auto")}
                title="Auto-shift colors with slides"
              >
                🔄 Auto
              </button>`;

if (code.includes(targetButtonBlock)) {
  code = code.replace(targetButtonBlock, '');
} else {
  // Regex fallback in case of whitespace difference
  code = code.replace(/<button[^>]*className=\{`theme-auto-toggle[^`]*`\}[^>]*>[\s\S]*?<\/button>/, '');
}

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Successfully removed auto change colors button from RestaurantDetails.jsx');

// Sync to backup file
const backupPath = path.resolve(__dirname, 'RestaurantDetails.jsx.new');
fs.writeFileSync(backupPath, code, 'utf8');
console.log('Synchronized backup file');
