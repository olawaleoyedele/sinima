/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide') // install via: npm install tailwind-scrollbar-hide
  ],
};
// This Tailwind CSS configuration file specifies the content paths to scan for class names,
// extends the default theme, and includes no additional plugins.
// It is used to style the React application with Tailwind CSS utility classes.
// The `content` array includes all JavaScript and TypeScript files in the `src`
// directory, ensuring that Tailwind can purge unused styles in production builds.
// The `theme` object allows for customization of the default Tailwind theme, but in this
// case, no customizations are made.
// The `plugins` array is empty, indicating that no additional Tailwind plugins are used.