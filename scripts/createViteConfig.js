const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, '../../frontend/frontend/vite.config.js');

const configContent = `import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
});
`;

fs.writeFileSync(configPath, configContent, 'utf8');
console.log('Successfully created vite.config.js with host: 0.0.0.0 and port: 5173!');
