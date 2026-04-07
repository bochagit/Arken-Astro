document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('.header__nav-item a:not(.lang-link)')
	const menuToggle = document.getElementById('menu-toggle')

	const MOBILE_BREAKPOINT = 720
	const MOBILE_HEADER_OFFSET = 51
	const DESKTOP_HEADER_OFFSET = 0

	const pathnameParts = window.location.pathname.split('/').filter(Boolean)
	const lang = ['es', 'en'].includes(pathnameParts[0]) ? pathnameParts[0] : 'es'
	const isHome = `/${lang}/` === window.location.pathname || `/` === window.location.pathname

	function getOffset() {
		return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
			? MOBILE_HEADER_OFFSET
			: DESKTOP_HEADER_OFFSET
	}

	function closeMenuIfOpen() {
		if (menuToggle && menuToggle.checked) {
			menuToggle.checked = false
			document.body.style.overflow = ''
		}
	}

	function cleanHash() {
		history.replaceState({}, '', `${window.location.pathname}${window.location.search}`)
	}

	function scrollToId(id) {
		const el = document.getElementById(id)
		if (!el) return

		const top = el.getBoundingClientRect().top + window.scrollY - getOffset()
		window.scrollTo({ top, behavior: 'smooth' })
	}

	navLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			const href = link.getAttribute('href') || ''

			if (!isHome) return

			if (href === `/${lang}/` || href === '/') {
				event.preventDefault()
				closeMenuIfOpen()
				window.scrollTo({ top: 0, behavior: 'smooth' })
				cleanHash()
				return
			}

			if (href.startsWith('/#')) {
				event.preventDefault()
				closeMenuIfOpen()
				scrollToId(href.slice(2))
				cleanHash()
			}
		})
	})

	if (isHome && window.location.hash) {
		const id = window.location.hash.slice(1)
		requestAnimationFrame(() => {
			scrollToId(id)
			cleanHash()
		})
	}
})
