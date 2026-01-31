import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [], // 🔥 React Compiler DISABLED
      },
    }),
  ],
  resolve: {
    alias: {
      "react/compiler-runtime": "react/jsx-runtime", // 🔥 HARD BLOCK
    },
  },
});
