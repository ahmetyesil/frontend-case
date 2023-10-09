module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1921px",
      // => @media (min-width: 1921px) { ... }
    },
    animation: {
      "spin-slow": "spin 1s linear infinite",
      radar: "waves 4s infinite ease",
      fade: "fadeOut 0.5s ease-in-out",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
