import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-cart-mobile/", // ← 리포지토리명으로 꼭 설정
});
