import { request, buildQueryString } from './api';

export const restaurantService = {
  async getAll(params = {}) {
    const qs = buildQueryString(params);
    const res = await request(`/restaurants${qs}`, {
      method: 'GET',
    });
    return Array.isArray(res) ? res : res.data || res.restaurants || [];
  },

  async getById(id) {
    const res = await request(`/restaurants/${id}`, {
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
    return request(`/restaurants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(restaurantData),
    });
  },

  async delete(id) {
    return request(`/restaurants/${id}`, {
      method: 'DELETE',
    });
  },
};

export default restaurantService;
