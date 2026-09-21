const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '../../frontend/frontend/src/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Update line 50 #app rule
css = css.replace(
  /#app\s*\{\s*width:\s*min\(1200px,\s*calc\(100%\s*-\s*32px\)\);\s*margin:\s*0\s*auto;\s*min-height:\s*100vh;\s*padding:\s*24px\s*0\s*36px;\s*\}/,
  `#app {
  width: 100%;
  max-width: 100%;
  margin: 0;
  min-height: 100vh;
  padding: 14px 18px 48px;
  box-sizing: border-box;
}`
);

// 2. Update line 1830 #app rule
css = css.replace(
  /#app\s*\{\s*width:\s*min\(1240px,\s*calc\(100%\s*-\s*48px\)\);\s*padding:\s*28px\s*0\s*56px;\s*\}/,
  `#app {
  width: 100%;
  max-width: 100%;
  padding: 14px 18px 48px;
  box-sizing: border-box;
}`
);

// 3. Update media query max-width: 700px
css = css.replace(
  /#app\s*\{\s*width:\s*min\(100%\s*-\s*28px,\s*1240px\);\s*padding-top:\s*14px;\s*\}/,
  `#app { width: 100%; padding: 12px 12px 36px; }`
);

// 4. Update hero nav arrows and hero copy to properly position inside the wider dashboard
css = css.replace(
  '.hero-nav-arrow.prev { left: -52px; }',
  '.hero-nav-arrow.prev { left: 14px; }'
);
css = css.replace(
  '.hero-nav-arrow.next { right: -52px; }',
  '.hero-nav-arrow.next { right: 14px; }'
);

// Update dashboard-hero-copy width so headline and search breathe comfortably on wide screen
css = css.replace(
  '.dashboard-hero-copy {\n  width: min(840px, 100%);\n  margin: 0 auto;\n  text-align: center;\n}',
  `.dashboard-hero-copy {
  width: min(1040px, 100%);
  margin: 0 auto;
  text-align: center;
  padding: 0 40px;
}`
);

// Update restaurant-grid to fill the wide screen dynamically
css = css.replace(
  '.restaurant-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n  margin-top: 18px;\n}',
  `.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
  margin-top: 18px;
  width: 100%;
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully removed left and right empty spaces from dashboard and app layout!');
