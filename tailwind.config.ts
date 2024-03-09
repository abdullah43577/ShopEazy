import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1280px",
      "2xl": "1340px",
      "3xl": "1440px",
    },

    extend: {
      colors: {
        black: "#0D0D0D",
        txtDarkBG: "#FBFBFB",
        ctaDark: "#E0E0E2",
        darkElBg: "#1E1E1E",
        white: "#FFFFFF",
        txtWhiteBG: "#030303",
        whiteElBg: "#F6F6F8",
        bookmark: "#E92039",
      },
    },
  },
  plugins: [],
};
export default config;
