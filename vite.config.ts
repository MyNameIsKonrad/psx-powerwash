import { defineConfig } from 'vite';

// GH Pages serves at https://<user>.github.io/powerwash-prototype/ — base must match the repo name.
export default defineConfig({
  base: '/powerwash-prototype/',
  server: { host: true },
});
