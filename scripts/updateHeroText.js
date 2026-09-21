const fs = require('fs');
const path = require('path');

const homePath = path.resolve(__dirname, '../../frontend/frontend/src/Home.jsx');
let content = fs.readFileSync(homePath, 'utf-8');

// Replace badge
content = content.replace(
  '<span>LIVE RESTAURANT DATABASE</span>',
  '<span>DISCOVER TOP RATED RESTAURANTS</span>'
);

// Replace title
content = content.replace(
  '<h1 className="hero-title" style={{ fontSize: \'clamp(2rem, 3.5vw, 3rem)\' }}>\n            Explore <span>{restaurants.length} Authentic Restaurants</span> in Your Database\n          </h1>',
  '<h1 className="hero-title" style={{ fontSize: \'clamp(2rem, 3.5vw, 3rem)\' }}>\n            Discover Delicious Food from <span>Top Rated Restaurants</span>\n          </h1>'
);

// Replace description
content = content.replace(
  '<p className="hero-description">\n            Browse and order directly from verified restaurants loaded live from your MongoDB backend database.\n          </p>',
  '<p className="hero-description">\n            Order your favorite biryanis, rich curries, authentic tiffins, and delicious food delivered hot and fresh to your doorstep.\n          </p>'
);

// Replace visual glass badge
content = content.replace(
  '<div className="badge-icon">📍</div>\n              <div>\n                <strong>MongoDB Connected</strong>\n                <p>Real-time API synchronized</p>\n              </div>',
  '<div className="badge-icon">⚡</div>\n              <div>\n                <strong>Super Fast Delivery</strong>\n                <p>Hot, fresh & prepared on order</p>\n              </div>'
);

fs.writeFileSync(homePath, content, 'utf8');
console.log('Successfully updated hero section with appetizing, customer-focused text!');
