/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        slate: "#425066",
        mist: "#eef1f6",
        surface: "#f7f3ee",
        accent: "#0f766e",
        accentDark: "#0b5c56",
        glow: "#f59e0b"
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["Work Sans", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        card: "0 24px 60px -40px rgba(15, 23, 42, 0.5)",
        soft: "0 18px 40px -30px rgba(15, 118, 110, 0.45)"
      },
      backgroundImage: {
        hero:
          "radial-gradient(circle at top, rgba(15, 118, 110, 0.18), transparent 60%), radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.18), transparent 55%)",
        grid:
          "linear-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

