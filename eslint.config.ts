import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import json from '@eslint/json'
import css from '@eslint/css'
import astro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{ ignores: ['dist', '.astro', 'node_modules', 'package-lock.json', 'src/styles/*'] },
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},
	tseslint.configs.recommended,
	...astro.configs.recommended,
	{ files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
	{
		files: ['**/*.jsonc'],
		plugins: { json },
		language: 'json/jsonc',
		extends: ['json/recommended']
	},
	{ files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
	{ files: ['**/*.astro'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
	{ plugins: { prettier: prettierPlugin }, rules: { 'prettier/prettier': 'error' } },
	prettier
])
