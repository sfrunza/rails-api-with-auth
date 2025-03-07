import path from "path"
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api/v1": {
        target: process.env.VITE_BASE_URL,
        changeOrigin: true,
      },
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         // Extract node_modules dependencies
  //         if (id.includes("node_modules")) {
  //           // if (id.includes("react")) {
  //           //   return "vendor-react"; // React core libs
  //           // }
  //           if (id.includes("react-router")) {
  //             return "vendor-router"; // React Router
  //           }
  //           if (id.includes("redux") || id.includes("@reduxjs/toolkit")) {
  //             return "vendor-redux"; // Redux
  //           }
  //           if (id.includes("date-fns")) {
  //             return "vendor-date-fns"; // Date Fns
  //           }
  //           if (id.includes("libphonenumber-js")) {
  //             return "vendor-libphonenumber-js"; // Libphonenumber Js
  //           }
  //           if (id.includes("@shadcn") || id.includes("lucide-react")) {
  //             return "vendor-ui"; // UI Libraries (ShadCN, Lucide)
  //           }
  //           return "vendor"; // Default vendor chunk
  //         }

  //         // Dynamic Import for Pages
  //         if (id.includes("/src/pages/")) {
  //           return `page-${id.split("/src/pages/")[1].split("/")[0]}`;
  //         }

  //         return null;
  //       },
  //     },
  //   },
  // },
})
