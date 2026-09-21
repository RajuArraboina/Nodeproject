const fs = require('fs');
const path = require('path');

// 1. Update App.jsx
const appPath = path.resolve(__dirname, '../../frontend/frontend/src/App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Ensure userRole initializes from localStorage
appContent = appContent.replace(
  'const [userRole, setUserRole] = useState("");',
  'const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || "");'
);

// Ensure localStorage stores userRole in auth/me check
appContent = appContent.replace(
  'setUserRole(data.data.role || "user");',
  'const role = data.data.role || "user"; setUserRole(role); localStorage.setItem("userRole", role);'
);

// Ensure localStorage removes userRole on logout
appContent = appContent.replace(
  'localStorage.removeItem("token");',
  'localStorage.removeItem("token"); localStorage.removeItem("userRole");'
);

// Ensure onLoginSuccess sets userRole in localStorage
appContent = appContent.replace(
  'setUserRole(role);\n            setPage("restaurants");',
  'setUserRole(role);\n            localStorage.setItem("userRole", role);\n            setPage("restaurants");'
);

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('App.jsx updated with strict admin role handling.');

// 2. Update RestaurantDetails.jsx
const detailsPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');
let detailsContent = fs.readFileSync(detailsPath, 'utf8');

detailsContent = detailsContent.replace(
  'canCreateRestaurant,',
  'canCreateRestaurant = false,'
);

detailsContent = detailsContent.replace(
  '{!selectedRestaurant && canCreateRestaurant && (',
  '{!selectedRestaurant && Boolean(canCreateRestaurant) && ('
);

fs.writeFileSync(detailsPath, detailsContent, 'utf8');
console.log('RestaurantDetails.jsx updated with default canCreateRestaurant=false.');
