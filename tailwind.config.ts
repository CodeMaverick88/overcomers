import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {

			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				primary50: '#EFF0FE',
				primary100: '#E1E5FE',
				primary200: '#CACFFB',
				primary300: '#A9AFF8',
				primary400: '#8786F3',
				primary500: '#7369EB',
				primary600: '#5C44DC',
				primary700: '#563FC3',
				primary800: '#47359E',
				primary900: '#3D327D',
				primary950: '#241D49',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontSize: {
				displayLarge: ["57px", "64px"],
				displayMedium: ["45px", "52px"],
				displaySmall: ["36px", "44px"],
				headlineLarge: ["32px", "40px"],
				headlineMedium: ["28px", "36px"],
				headlineSmall: ["24px", "32px"],
				titleLarge: ["22px", "28px"],
				titleMedium: ["16px", "24px"],
				titleSmall: ["14px", "20px"],
				labelLarge: ["16px", "20px"],
				labelMedium: ["12px", "16px"],
				labelSmall: ["11px", "16px"],
				bodyLarge: ["16px", "24px"],
				bodyMedium: ["14px", "20px"],
				bodySmall: ["12px", "16px"]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},

			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				spotlight: {
					"0%": {
						opacity: '0',
						transform: "translate(-72%, -62%) scale(0.5)",
					},
					"100%": {
						opacity: '1',
						transform: "translate(-50%,-40%) scale(1)",
					},
				},
				fadeIn: {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				spinSlow: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'20%, 25%': { transform: 'rotate(90deg) scale(1.3)' },
					'45%, 50%': { transform: 'rotate(180deg) scale(1)' },
					'70%, 75%': { transform: 'rotate(270deg) scale(1.3)' },
					'95%, 100%': { transform: 'rotate(360deg) scale(1)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				spotlight: "spotlight 2s ease .75s 1 forwards",
				fadeIn: 'fadeIn 0.6s ease-in-out',
				'spin-slow': 'spinSlow 2s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
