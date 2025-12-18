import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      /**
       * Auto update service worker when new build is available
       */
      registerType: "autoUpdate",

      /**
       * Files that will always be cached
       */
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],

      /**
       * Web App Manifest
       */
      manifest: {
        id: "/",
        name: "Supreme Court Cases WebApp",
        short_name: "SCC",
        description:
          "Search, analyze, and explore Supreme Court case decisions",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#1e40af",
        categories: ["law", "education", "reference"],

        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      /**
       * Service Worker & Caching Strategy
       */
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          // Cache API search responses
          {
            urlPattern:
              /^https?:\/\/localhost:9090\/(search|browse|statistics|judges).*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-search-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              networkTimeoutSeconds: 5, // fallback to cache if network is slow
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // Cache static assets
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style" ||
              request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },

      /**
       * Enable PWA during local development
       */
      devOptions: {
        enabled: true,
      },
    }),
  ],

  optimizeDeps: {
    exclude: ["lucide-react"],
  },

  server: {
    port: 5173,
    host: true,
  },
});
