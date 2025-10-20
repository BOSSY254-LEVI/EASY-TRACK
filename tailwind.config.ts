import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        // Easy Track Brand Colors
                        'teal-primary': '#0F5959',
                        'hope-blue': '#2A9D8F',
                        'earth-green': '#4CAF50',
                        'amber-alert': '#F4A261',
                        'coral-critical': '#E76F51',
                        'bg-light': '#F8FBFB',
                        'text-primary': '#1A2A2A',
                        'text-secondary': '#5A6C6C',
                        'border-light': '#E0E6E5',

                        // Additional Theme Colors
                        'ocean-blue': '#1E3A8A',
                        'sunset-orange': '#EA580C',
                        'forest-green': '#166534',
                        'purple-royal': '#7C3AED',
                        'rose-pink': '#BE185D',
                        'slate-gray': '#334155',

                        // Shadcn UI Colors (keeping for compatibility)
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)',
                        'card': '8px',
                        'modal': '12px',
                        'pill': '24px'
                },
                fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                        'poppins': ['Poppins', 'sans-serif']
                },
                boxShadow: {
                        'neumorphic': '8px 8px 16px rgba(15, 89, 89, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                        'neumorphic-inset': 'inset 8px 8px 16px rgba(15, 89, 89, 0.1), inset -8px -8px 16px rgba(255, 255, 255, 0.8)',
                        'card-hover': '0 12px 24px rgba(15, 89, 89, 0.15)',
                        'subtle': '0 2px 8px rgba(15, 89, 89, 0.08)',
                        'glow': '0 0 20px rgba(15, 89, 89, 0.3)',
                        'inner-glow': 'inset 0 0 20px rgba(15, 89, 89, 0.1)'
                },
                animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.3s ease-out',
                        'bounce-gentle': 'bounceGentle 2s infinite',
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'shimmer': 'shimmer 2s linear infinite'
                },
                keyframes: {
                        fadeIn: {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' }
                        },
                        slideUp: {
                                '0%': { transform: 'translateY(10px)', opacity: '0' },
                                '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        bounceGentle: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-5px)' }
                        },
                        shimmer: {
                                '0%': { backgroundPosition: '-200% 0' },
                                '100%': { backgroundPosition: '200% 0' }
                        }
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
