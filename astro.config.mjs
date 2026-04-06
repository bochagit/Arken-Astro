// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
  server: {
		host: true,
		port: 4321
	},
	vite: {
		server: {
			allowedHosts: ['.tunnelmole.net']
		}
	}
})