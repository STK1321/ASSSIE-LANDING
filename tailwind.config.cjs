/** @type {import('tailwindcss').Config} */
// Lemon visual system tokens.
// Source of truth: docs/superpowers/specs/2026-11-28-asssie-landing-lemon-visual-system.md
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#0E0E0E",
        card: "#171717",
        elevated: "#1E1E1E",
        divider: "#262626",
        lemon: "#CFFF2E",
        onLemon: "#0B0B0B",
        green: "#00DF1A",
        deepGreen: "#003D1B",
        text: "#F5F4F0",
        muted: "#A2A2A1",
        danger: "#EB3131",
        warning: "#F6B60B",

        // Legacy aliases still passed by the section components. They resolve
        // to the dark values above so the in-progress re-skin stays legible.
        ink: "#F5F4F0",
        slate: "#A2A2A1",
        mist: "#1E1E1E",
        surface: "#171717",
        accent: "#CFFF2E",
        white: "#171717"
      },
      fontFamily: {
        display: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      borderRadius: {
        card: "24px",
        medium: "20px"
      }
    }
  },
  plugins: []
};
