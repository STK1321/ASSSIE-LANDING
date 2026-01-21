/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        slate: "#3b4456",
        mist: "#eef1f6",
        surface: "#f7f8fb",
        accent: "#2563eb",
        accentDark: "#1d4ed8",
        glow: "#7dd3fc"
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        card: "0 20px 60px -40px rgba(15, 23, 42, 0.6)",
        soft: "0 12px 30px -20px rgba(37, 99, 235, 0.4)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top, rgba(37, 99, 235, 0.18), transparent 60%), radial-gradient(circle at 20% 20%, rgba(125, 211, 252, 0.2), transparent 55%)",
        grid: "linear-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
