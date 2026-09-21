const fs = require('fs');
const path = require('path');

const appPath = path.resolve(__dirname, '../../frontend/frontend/src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

const target = `<RestaurantDetails
          canCreateRestaurant={isAdmin}
          onCreateRestaurant={() => {`;

const replacement = `<RestaurantDetails
          canCreateRestaurant={isAdmin}
          isAuthenticated={isAuthenticated}
          onLogin={() => setPage("login")}
          onCreateRestaurant={() => {`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(appPath, content, 'utf8');
  console.log('App.jsx successfully updated!');
} else {
  console.log('Target not found or already updated.');
}
