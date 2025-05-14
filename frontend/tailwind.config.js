/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(button|link|navbar|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // Tailwind's primary color (Blue-400 equivalent)
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require('@heroui/theme')], // Make sure the plugin is required properly
};
