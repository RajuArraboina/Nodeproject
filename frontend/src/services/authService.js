import { request, setToken, removeToken } from './api';

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
