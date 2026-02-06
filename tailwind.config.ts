import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand – Green
        "green-900": "#073B3A",
        "green-700": "#0B6E4F",
        "green-600": "#08A045",
        "green-400": "#6BBF59",
        "green-300": "#21D375",
        // Wood / Material
        "wood-light": "#D2B48C",
        "wood-medium": "#B08968",
        "wood-dark": "#6B4F3F",
        // UI States
        success: "#21D375",
        warning: "#F2C94C",
        error: "#D64545",
        info: "#2F80ED",
      },
      backgroundColor: {
        main: "#F5F1E8",
        secondary: "#EFE6D8",
        card: "#FFFFFF",
        divider: "#E2D8C8",
      },
      textColor: {
        heading: "#2E2E2E",
        body: "#4A4A4A",
        muted: "#7A7A7A",
        inverse: "#FFFFFF",
      },
      borderColor: {
        inverse: "#FFFFFF",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(0, 0, 0, 0.06)",
        medium: "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;

