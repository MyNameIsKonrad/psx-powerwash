import { defineConfig } from 'vite';

// GH Pages serves at https://<user>.github.io/psx-powerwash/ — base must match the repo name.
export default defineConfig({
  base: '/psx-powerwash/',
  server: { host: true },
});
