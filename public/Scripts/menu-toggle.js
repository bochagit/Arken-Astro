document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.getElementById('menu-toggle')
	const navLinks = document.querySelectorAll('.header__nav-item a')
	const body = document.body

	if (!menuToggle) return // Evita errores si no existe el input

	// Bloquear/desbloquear scroll al abrir/cerrar el menú
	menuToggle.addEventListener('change', () => {
		if (menuToggle.checked) {
			body.style.overflow = 'hidden'
		} else {
			body.style.overflow = ''
		}
	})

	// Cerrar el menú al hacer clic en un enlace
	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			menuToggle.checked = false
			body.style.overflow = ''
		})
	})
})
