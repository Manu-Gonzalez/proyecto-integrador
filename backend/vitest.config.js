import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    globals: true, // Evita tener que importar { describe, expect, it }
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app/"),
      "@database": path.resolve(__dirname, "src/database/"),
      "@diContainer": path.resolve(__dirname, "src/diContainer/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
    },
  },
});
