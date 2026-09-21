const fs = require('fs');
const path = require('path');

// 1. Update Login.jsx
const loginPath = path.resolve(__dirname, '../../frontend/frontend/src/Login.jsx');
let loginContent = fs.readFileSync(loginPath, 'utf8');

// Add useEffect import if not there
if (!loginContent.includes('import { useState, useEffect } from "react";')) {
  loginContent = loginContent.replace(
    'import { useState } from "react";',
    'import { useState, useEffect } from "react";'
  );
}

// Add restaurantCount state and fetch
if (!loginContent.includes('restaurantCount')) {
  loginContent = loginContent.replace(
    'const [isSubmitting, setIsSubmitting] = useState(false);',
    `const [isSubmitting, setIsSubmitting] = useState(false);
	const [restaurantCount, setRestaurantCount] = useState(20);

	useEffect(() => {
		fetch("http://localhost:5000/api/restaurants")
			.then((res) => res.json())
			.then((data) => {
				const count = data.count || (Array.isArray(data) ? data.length : data.data?.length) || 20;
				setRestaurantCount(count);
			})
			.catch(() => {});
	}, []);`
  );
}

// Replace <strong>400+</strong> with <strong>{restaurantCount}</strong>
loginContent = loginContent.replace(
  '<strong>400+</strong>',
  '<strong>{restaurantCount}</strong>'
);

// Fix close button A- to ×
loginContent = loginContent.replace('aria-label="Close login">A-</button>', 'aria-label="Close login">×</button>');

fs.writeFileSync(loginPath, loginContent, 'utf8');
console.log('Login.jsx updated with dynamic restaurant count.');

// 2. Update RestaurantDetails.jsx
const detailsPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');
let detailsContent = fs.readFileSync(detailsPath, 'utf8');

// Update heading to show real restaurant count
detailsContent = detailsContent.replace(
  '<h1>{selectedRestaurant ? selectedRestaurant.name : "Restaurants"}</h1>',
  '<h1>{selectedRestaurant ? selectedRestaurant.name : `Restaurants (${restaurants.length})`}</h1>'
);

detailsContent = detailsContent.replace(
  '<span>Warangal, Telangana</span>',
  '<span>Warangal, Telangana • {restaurants.length} Restaurants</span>'
);

detailsContent = detailsContent.replace(
  '<p className="eyebrow">{selectedRestaurant ? "RESTAURANT MENU & DETAILS" : "EXPLORE THE COLLECTION"}</p>',
  '<p className="eyebrow">{selectedRestaurant ? "RESTAURANT MENU & DETAILS" : `EXPLORE THE COLLECTION • ${restaurants.length} RESTAURANTS`}</p>'
);

fs.writeFileSync(detailsPath, detailsContent, 'utf8');
console.log('RestaurantDetails.jsx updated with dynamic restaurant counts.');
