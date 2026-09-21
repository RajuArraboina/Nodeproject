const fs = require('fs');
const path = require('path');

const p = path.resolve(__dirname, '../../frontend/frontend/src/services/api.js');
let code = fs.readFileSync(p, 'utf-8');

if (!code.includes('restaurantAPI')) {
  code += `
import { restaurantService } from './restaurantService';
import { authService } from './authService';

export { restaurantService, authService };
export const restaurantAPI = restaurantService;
export const authAPI = authService;
`;
  fs.writeFileSync(p, code, 'utf-8');
  console.log('Successfully updated api.js with restaurantAPI and authAPI exports!');
} else {
  console.log('api.js already contains restaurantAPI');
}
