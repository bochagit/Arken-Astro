// Detect browser language and redirect to appropriate locale
;(function () {
	const pathname = window.location.pathname
	const isRootPath = pathname === '/' || pathname === ''

	if (!isRootPath) return

	// Get the browser's preferred language
	const browserLang = navigator.language || navigator.userLanguage
	const langCode = browserLang.split('-')[0].toLowerCase()

	// Map browser languages to supported locales
	const supportedLocales = {
		es: 'es',
		en: 'en'
	}

	// Default to Spanish if language is not supported
	const locale = supportedLocales[langCode] || 'es'

	// Redirect to the appropriate locale
	if (locale === 'es') {
		window.location.href = '/es/'
	} else if (locale === 'en') {
		window.location.href = '/en/'
	}
})()
