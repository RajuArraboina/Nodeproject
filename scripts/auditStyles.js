const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');
const css = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf-8');

const jsxFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));
const componentsDir = path.join(srcDir, 'components');
if (fs.existsSync(componentsDir)) {
  fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx')).forEach(f => jsxFiles.push('components/' + f));
}

const usedClasses = new Set();
jsxFiles.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  const classMatches = content.match(/className=(?:\{`([^`]+)`\}|"([^"]+)"|'([^']+)')/g) || [];
  classMatches.forEach(cm => {
    const raw = cm.replace(/^className=(?:\{`|"|')/, '').replace(/(?:`\}|"|')$/, '');
    raw.split(/\s+/).forEach(c => {
      const trimmed = c.trim();
      if (trimmed && !trimmed.includes('${') && !trimmed.includes('{') && !trimmed.includes('?')) {
        usedClasses.add(trimmed);
      }
    });
  });
});

const missing = [];
const found = [];
usedClasses.forEach(c => {
  if (css.includes('.' + c) || css.includes(c)) {
    found.push(c);
  } else {
    missing.push(c);
  }
});

console.log('Total unique classes in JSX:', usedClasses.size);
console.log('Found in style.css:', found.length);
console.log('Missing in style.css:', missing.length);
if (missing.length > 0) {
  console.log('Missing classes list:');
  console.log(JSON.stringify(missing, null, 2));
}
