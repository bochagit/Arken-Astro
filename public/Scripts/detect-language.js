// Normalize legacy Spanish URLs and keep the root route on Spanish.
;(function () {
	const pathname = window.location.pathname

	if (pathname === '/es' || pathname.startsWith('/es/')) {
		window.location.replace(pathname.replace(/^\/es/, '') || '/')
	}
})()
