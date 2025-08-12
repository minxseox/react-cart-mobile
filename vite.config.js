import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 개발: '/', 배포: '/react-cart-mobile/'
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/react-cart-mobile/" : "/",
});
