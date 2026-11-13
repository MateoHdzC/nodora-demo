import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const conIdiomas = createNextIntlPlugin("./i18n/request.ts");

// Vacío en desarrollo; "/nodora-demo" al publicar en GitHub Pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Sitio 100 % estático: sin servidor, todo sale a out/
  output: "export",
  basePath,
  // Pages sirve kit/index.html sin configurar nada
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Hay dos layouts raíz (es y en), así que el 404 tiene que ser global
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default conIdiomas(nextConfig);
