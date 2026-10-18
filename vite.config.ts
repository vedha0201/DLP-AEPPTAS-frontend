import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    base: "/DLP-AEPPTAS-frontend/",
    server: {
      proxy: {
        // Forward all /api requests from the Vite dev server to the Express backend.
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
  },
});
