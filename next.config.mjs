/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// Static export so the catalog can be hosted on GitHub Pages at /shipyard.
const nextConfig = {
  output: "export",
  basePath: isProd ? "/shipyard" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
