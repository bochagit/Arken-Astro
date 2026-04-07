import { ui, defaultLanguage } from './index'

export type Language = keyof typeof ui

export function getLangFromUrl(url: URL): Language {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as Language
	return defaultLanguage
}

export function useTranslations(lang: Language) {
	return function t(key: keyof (typeof ui)[typeof defaultLanguage]): string {
		return ui[lang][key] || ui[defaultLanguage][key]
	}
}

export function getRelativeLocaleUrl(lang: Language, path = ''): string {
	return `/${lang}${path}`
}

export function getPathWithoutLocale(pathname: string): string {
	const [, lang, ...rest] = pathname.split('/')
	if (lang in ui) {
		return `/${rest.join('/')}`
	}
	return pathname
}
