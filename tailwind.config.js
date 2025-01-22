/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  				'50': 'hsl(var(--primary-50))',
  				'75': 'hsl(var(--primary-75))',
  				'100': 'hsl(var(--primary-100))',
  				'200': 'hsl(var(--primary-200))',
  				'300': 'hsl(var(--primary-300))',
  				'400': 'hsl(var(--primary-400))',
  				'500': 'hsl(var(--primary-500))'
  			},
  			secondary: {
  				'50': 'hsl(var(--secondary-50))',
  				'75': 'hsl(var(--secondary-75))',
  				'100': 'hsl(var(--secondary-100))',
  				'200': 'hsl(var(--secondary-200))',
  				'300': 'hsl(var(--secondary-300))',
  				'400': 'hsl(var(--secondary-400))',
  				'500': 'hsl(var(--secondary-500))'
  			},
  			accent: {
  				'50': 'hsl(var(--accent-50))',
  				'75': 'hsl(var(--accent-75))',
  				'100': 'hsl(var(--accent-100))',
  				'200': 'hsl(var(--accent-200))',
  				'300': 'hsl(var(--accent-300))',
  				'400': 'hsl(var(--accent-400))',
  				'500': 'hsl(var(--accent-500))'
  			},
  			neutral: {
  				lighter: 'hsl(var(--neutral-lighter))',
  				light: 'hsl(var(--neutral-light))',
  				medium: 'hsl(var(--neutral-medium))',
  				dark: 'hsl(var(--neutral-dark))',
  				darker: 'hsl(var(--neutral-darker))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

