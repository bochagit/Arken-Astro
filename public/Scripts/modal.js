document.addEventListener('DOMContentLoaded', () => {
	const modal = document.getElementById('imageModal')
	const modalImg = document.getElementById('modalImg')
	const closeBtn = document.querySelector('.image-modal__close')
	const zoomableImages = document.querySelectorAll(
		'.heroe__image, .gallery img, .box__box, .main__description-img'
	)

	if (!modal || !modalImg || !closeBtn || zoomableImages.length === 0) return

	function getHDImagePath(originalSrc) {
		const extension = originalSrc.split('.').pop()
		const pathWithoutExtension = originalSrc.replace(`.${extension}`, '')
		return `${pathWithoutExtension}_HD.${extension}`
	}

	function openModal(img) {
		modal.style.display = 'flex'
		modal.setAttribute('aria-hidden', 'false')

		modalImg.src = img.alt === 'Elementos del juego' ? getHDImagePath(img.src) : img.src
		modalImg.alt = img.alt || 'Imagen ampliada'
	}

	function closeModal() {
		modal.style.display = 'none'
		modal.setAttribute('aria-hidden', 'true')
	}

	zoomableImages.forEach((img) => {
		img.style.cursor = 'zoom-in'
		img.addEventListener('pointerup', () => openModal(img))
		img.addEventListener('click', () => openModal(img))
	})

	closeBtn.addEventListener('click', closeModal)

	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal()
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeModal()
	})
})
