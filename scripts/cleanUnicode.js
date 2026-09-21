const fs = require('fs');
const path = require('path');

const detailsPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');
let content = fs.readFileSync(detailsPath, 'utf8');

content = content.replace(/dY"\?/g, '📍');
content = content.replace(/dY>,\?/g, '🛡️');

fs.writeFileSync(detailsPath, content, 'utf8');
console.log('Cleaned unicode characters in RestaurantDetails.jsx');
