/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#E8F4F8",
                    100: "#B8E0EA",
                    200: "#8ACCDD",
                    300: "#5CB8D0",
                    400: "#2EA4C3",
                    500: "#1F7A8C",
                    600: "#196878",
                    700: "#135664",
                    800: "#0D4450",
                    900: "#0B2E4F",
                    950: "#061B33",
                },
                secondary: {
                    DEFAULT: "#F4A261",
                    50: "#FDF3E7",
                    100: "#FAE3C4",
                    200: "#F7D3A1",
                    300: "#F4C37E",
                    400: "#F1B35B",
                    500: "#F4A261",
                    600: "#C9834D",
                    700: "#9E6439",
                    800: "#734525",
                    900: "#482611",
                },
                accent: {
                    DEFAULT: "#2A9D8F",
                    50: "#E6F6F4",
                    100: "#B3E6E0",
                    200: "#80D6CC",
                    300: "#4DC6B8",
                    400: "#2A9D8F",
                    500: "#238B7E",
                    600: "#1C796D",
                    700: "#15675C",
                    800: "#0E554B",
                    900: "#07433A",
                },
                dark: "#0A1628",
                light: "#F8FAFC",
            },
            fontFamily: {
                display: ["'Playfair Display'", "serif"],
                sans: ["'Inter'", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.8s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                "slide-down": "slideDown 0.6s ease-out forwards",
                "scale-in": "scaleIn 0.5s ease-out forwards",
                "float": "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "spin-slow": "spin 20s linear infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideDown: {
                    "0%": { opacity: "0", transform: "translateY(-40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-gradient": "linear-gradient(135deg, #0B2E4F 0%, #1F7A8C 50%, #2A9D8F 100%)",
                "sunset-gradient": "linear-gradient(180deg, #F4A261 0%, #E76F51 50%, #8B2635 100%)",
                "gold-shimmer": "linear-gradient(90deg, transparent, rgba(244,162,97,0.3), transparent)",
            },
        },
    },
    plugins: [],
};
