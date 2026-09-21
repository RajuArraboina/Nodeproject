const fs = require('fs');
const path = require('path');

const servicesDir = path.resolve(__dirname, '../../frontend/frontend/src/services');
if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
}

// 1. api.js - Core HTTP client and token helpers
const apiJsContent = `// Centralized Base API Client
export const API_BASE_URL = 'http://localhost:5000/api';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

export function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
}

export function buildQueryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      query.append(key, String(value).trim());
    }
  });
  const str = query.toString();
  return str ? \`?\${str}\` : '';
}

export async function request(endpoint, options = {}) {
  const url = \`\${API_BASE_URL}\${endpoint}\`;
  const headers = {
    'Accept': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = \`Bearer \${token}\`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      const errorMsg = data.message || data.error || \`Request failed with status \${response.status}\`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;

      if (response.status === 401 && token) {
        removeToken();
        window.dispatchEvent(new CustomEvent('auth:expired'));
      }

      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netErr = new Error('Cannot connect to restaurant backend server at http://localhost:5000. Please ensure the server is active.');
      netErr.status = 0;
      throw netErr;
    }
    throw err;
  }
}
`;

// 2. authService.js
const authServiceContent = `import { request, setToken, removeToken } from './api';

export const authService = {
  async login(email, password) {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      setToken(res.token);
    }
    return res;
  },

  async register({ name, email, password, role = 'user' }) {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    if (res.token) {
      setToken(res.token);
    }
    return res;
  },

  async getMe() {
    return request('/auth/me', {
      method: 'GET',
    });
  },

  async logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
      // Network ignore
    } finally {
      removeToken();
    }
  },
};

export default authService;
`;

// 3. restaurantService.js
const restaurantServiceContent = `import { request, buildQueryString } from './api';

export const restaurantService = {
  async getAll(params = {}) {
    const qs = buildQueryString(params);
    const res = await request(\`/restaurants\${qs}\`, {
      method: 'GET',
    });
    return Array.isArray(res) ? res : res.data || res.restaurants || [];
  },

  async getById(id) {
    const res = await request(\`/restaurants/\${id}\`, {
      method: 'GET',
    });
    return res.data || res;
  },

  async create(restaurantData) {
    return request('/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaurantData),
    });
  },

  async update(id, restaurantData) {
    return request(\`/restaurants/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(restaurantData),
    });
  },

  async delete(id) {
    return request(\`/restaurants/\${id}\`, {
      method: 'DELETE',
    });
  },
};

export default restaurantService;
`;

fs.writeFileSync(path.join(servicesDir, 'api.js'), apiJsContent, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'authService.js'), authServiceContent, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'restaurantService.js'), restaurantServiceContent, 'utf8');
console.log('Successfully created api.js, authService.js, and restaurantService.js!');
