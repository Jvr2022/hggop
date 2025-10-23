import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Load dev-only plugins
const loadDevPlugins = async () => {
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const cartographer = await import("@replit/vite-plugin-cartographer").then(m => m.cartographer());
    const devBanner = await import("@replit/vite-plugin-dev-banner").then(m => m.devBanner());
    return [cartographer, devBanner];
  }
  return [];
};

export default defineConfig(async () => {
  const devPlugins = await loadDevPlugins();

  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...devPlugins
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      assetsDir: "",
      rollupOptions: {
        input: path.resolve(__dirname, "client/index.html")
      }
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
