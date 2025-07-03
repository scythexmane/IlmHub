import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    target: "esnext",
    // Опционально: можно указать outDir, если нужно
    outDir: "dist",
  },
  plugins: [tailwindcss(), react()],
});
