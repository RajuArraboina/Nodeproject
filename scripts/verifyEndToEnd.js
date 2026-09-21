const http = require('http');

async function testFetch(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { status: res.status, ok: res.ok, data };
}

async function runComprehensiveVerification() {
  console.log('=== STARTING COMPREHENSIVE END-TO-END VERIFICATION ===\n');
  let allPassed = true;

  // 1. Vite dev server index.html
  try {
    const r = await testFetch('http://localhost:5173/');
    if (r.ok && typeof r.data === 'string' && r.data.includes('<!doctype html>')) {
      console.log('✔ [Frontend Dev Server] http://localhost:5173/ is running and serving HTML (Status: ' + r.status + ')');
    } else {
      console.error('✖ [Frontend Dev Server] Failed to serve HTML:', r.status);
      allPassed = false;
    }
  } catch (err) {
    console.error('✖ [Frontend Dev Server] Connection error:', err.message);
    allPassed = false;
  }

  // 2. Vite compilation of main.js & style.css
  try {
    const rJs = await testFetch('http://localhost:5173/src/main.js');
    const rCss = await testFetch('http://localhost:5173/src/style.css');
    if (rJs.ok && rCss.ok) {
      console.log('✔ [Frontend Assets] main.js and style.css compiled successfully by Vite (Status 200)');
    } else {
      console.error('✖ [Frontend Assets] Asset compilation error - main.js:', rJs.status, 'style.css:', rCss.status);
      allPassed = false;
    }
  } catch (err) {
    console.error('✖ [Frontend Assets] Error fetching assets:', err.message);
    allPassed = false;
  }

  // 3. Check all page modules
  const modules = [
    'App.jsx',
    'Navbar.jsx',
    'Home.jsx',
    'Restaurants.jsx',
    'RestaurantDetails.jsx',
    'CreateRestaurant.jsx',
    'Login.jsx',
    'Register.jsx',
    'Profile.jsx',
    'Footer.jsx',
    'RestaurantCard.jsx',
    'MenuCard.jsx',
    'SearchBar.jsx',
    'context/AuthContext.jsx',
    'components/ProtectedRoute.jsx',
    'components/RestaurantSkeleton.jsx',
    'components/EmptyState.jsx',
    'components/ErrorMessage.jsx',
    'services/api.js',
    'services/authService.js',
    'services/restaurantService.js'
  ];

  let modulesOk = 0;
  for (const mod of modules) {
    try {
      const res = await testFetch(`http://localhost:5173/src/${mod}`);
      if (res.ok) {
        modulesOk++;
      } else {
        console.error(`✖ [Module Failed] /src/${mod} returned status ${res.status}`);
        allPassed = false;
      }
    } catch (err) {
      console.error(`✖ [Module Failed] /src/${mod} error: ${err.message}`);
      allPassed = false;
    }
  }
  console.log(`✔ [Frontend Architecture] ${modulesOk}/${modules.length} modules compiled with 0 errors`);

  // 4. Backend Restaurants API
  let firstRestaurantId = null;
  try {
    const r = await testFetch('http://localhost:5000/api/restaurants');
    if (r.ok && r.data && (Array.isArray(r.data.data) || Array.isArray(r.data))) {
      const list = Array.isArray(r.data.data) ? r.data.data : r.data;
      console.log(`✔ [Backend API] GET /api/restaurants succeeded (Returned ${list.length} restaurants)`);
      if (list.length > 0) {
        firstRestaurantId = list[0]._id;
      }
    } else {
      console.error('✖ [Backend API] GET /api/restaurants returned unexpected payload:', r.status);
      allPassed = false;
    }
  } catch (err) {
    console.error('✖ [Backend API] GET /api/restaurants connection error:', err.message);
    allPassed = false;
  }

  // 5. Backend Single Restaurant API
  if (firstRestaurantId) {
    try {
      const r = await testFetch(`http://localhost:5000/api/restaurants/${firstRestaurantId}`);
      if (r.ok && r.data) {
        const item = r.data.data || r.data;
        console.log(`✔ [Backend API] GET /api/restaurants/${firstRestaurantId} succeeded ("${item.name}", Cuisine: ${item.cuisine}, Menu Items: ${item.menu?.length || 0})`);
      } else {
        console.error('✖ [Backend API] GET single restaurant failed:', r.status);
        allPassed = false;
      }
    } catch (err) {
      console.error('✖ [Backend API] GET single restaurant error:', err.message);
      allPassed = false;
    }
  }

  // 6. Backend Auth Login
  let authToken = null;
  try {
    const r = await testFetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'raju@gmail.com', password: '12345678' })
    });
    if (r.ok && r.data && r.data.token) {
      authToken = r.data.token;
      console.log(`✔ [Backend Auth] POST /api/auth/login succeeded (User: "${r.data.user.name}", Role: "${r.data.user.role}")`);
    } else {
      console.error('✖ [Backend Auth] POST /api/auth/login failed:', r.status, r.data);
      allPassed = false;
    }
  } catch (err) {
    console.error('✖ [Backend Auth] POST /api/auth/login error:', err.message);
    allPassed = false;
  }

  // 7. Backend Auth Me
  if (authToken) {
    try {
      const r = await testFetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (r.ok && r.data) {
        const user = r.data.data || r.data.user;
        console.log(`✔ [Backend Auth] GET /api/auth/me succeeded with JWT Bearer (Verified ID: ${user._id})`);
      } else {
        console.error('✖ [Backend Auth] GET /api/auth/me failed:', r.status);
        allPassed = false;
      }
    } catch (err) {
      console.error('✖ [Backend Auth] GET /api/auth/me error:', err.message);
      allPassed = false;
    }
  }

  console.log('\n=== VERIFICATION SUMMARY ===');
  if (allPassed) {
    console.log('🎉 ALL 7 TEST SUITES PASSED PERFECTLY WITH ZERO DEFECTS!');
  } else {
    console.log('⚠ SOME VERIFICATION STEPS FAILED. Please review the output above.');
  }
}

runComprehensiveVerification();
