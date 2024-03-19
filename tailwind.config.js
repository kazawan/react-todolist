/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-down": "fadeInDown 0.5s ease-in-out",
        "translateY-10": "translateY10 0.3s ease",
        "fade-out": "fadeOut 0.5s ease-in-out",
        "id-fade-out": "idFadeOut 0.3s ease-in-out",
        "icon-fade-in": "iconFadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        translateY10: {
          "0%": { transform: "translateY(-10px)" ,opacity: "0"},
          "100%": { transform: "translateY(0)", opacity: "1"},
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        idFadeOut: {
          "0%": { opacity: "1",transform: "translateY(0)"},
          "100%": { opacity: "0",transform: "translateY(-10px)"},
        },
        iconFadeIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
