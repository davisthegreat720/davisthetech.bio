import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-nb-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-nb-mono)", "JetBrains Mono", "monospace"],
        "nb-sans": ["var(--font-nb-sans)", "Inter", "sans-serif"],
        "nb-mono": ["var(--font-nb-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Neobrutalism type scale: 13 / 15 / 17 / 21 / 27 / 35
        "nb-xs": ["13px", "1.45"],
        "nb-sm": ["15px", "1.5"],
        "nb-base": ["17px", "1.5"],
        "nb-lg": ["21px", "1.3"],
        "nb-xl": ["27px", "1.2"],
        "nb-2xl": ["35px", "1.15"],
      },
      boxShadow: {
        "nb-sm": "3px 3px 0 0 #1C293C",
        nb: "4px 4px 0 0 #1C293C",
        "nb-lg": "6px 6px 0 0 #1C293C",
      },
      colors: {
        // Neobrutalism design tokens
        nb: {
          primary: "#FDC800",
          secondary: "#432DD7",
          success: "#16A34A",
          warning: "#D97706",
          danger: "#DC2626",
          surface: "#FBFBF9",
          text: "#1C293C",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config
