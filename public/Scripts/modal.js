document.addEventListener('DOMContentLoaded', () => {
	const modal = document.getElementById('imageModal')
	const modalImg = document.getElementById('modalImg')
	const closeBtn = document.querySelector('.image-modal__close')
	const prevBtn = document.getElementById('modalPrev')
	const nextBtn = document.getElementById('modalNext')
	const zoomableImages = document.querySelectorAll(
		'.heroe__image, .gallery img, .box__box, .main__description-img'
	)
	const modalImages = Array.from(zoomableImages)
	let currentSectionImages = []
	let currentImageIndex = -1

	if (!modal || !modalImg || !closeBtn || zoomableImages.length === 0) return

	function getHDImagePath(originalSrc) {
		const extension = originalSrc.split('.').pop()
		const pathWithoutExtension = originalSrc.replace(`.${extension}`, '')
		return `${pathWithoutExtension}_HD.${extension}`
	}

	function updateNavVisibility() {
		const shouldShowNav = currentImageIndex >= 0 && currentSectionImages.length > 1

		if (prevBtn) prevBtn.classList.toggle('is-visible', shouldShowNav)
		if (nextBtn) nextBtn.classList.toggle('is-visible', shouldShowNav)
	}

	function getImageSection(img) {
		if (img.classList.contains('heroe__image')) return 'heroes'
		if (img.closest('.gallery')) return 'gallery'
		if (img.classList.contains('main__description-img')) return 'description'
		if (img.classList.contains('box__box')) return 'box'
		return 'other'
	}

	function getSectionImages(img) {
		const section = getImageSection(img)
		return modalImages.filter((image) => getImageSection(image) === section)
	}

	function getModalSource(img) {
		return img.alt === 'Elementos del juego' ? getHDImagePath(img.src) : img.src
	}

	function setModalImage(img) {
		modal.style.display = 'flex'
		modal.setAttribute('aria-hidden', 'false')

		modalImg.src = getModalSource(img)
		modalImg.alt = img.alt || 'Imagen ampliada'
		if (currentSectionImages.length === 0 || !currentSectionImages.includes(img)) {
			currentSectionImages = getSectionImages(img)
		}
		currentImageIndex = currentSectionImages.indexOf(img)
		updateNavVisibility()
	}

	function openModal(img) {
		setModalImage(img)
	}

	function navigateGallery(direction) {
		if (currentImageIndex < 0 || currentSectionImages.length === 0) return

		currentImageIndex =
			(currentImageIndex + direction + currentSectionImages.length) % currentSectionImages.length
		setModalImage(currentSectionImages[currentImageIndex])
	}

	function closeModal() {
		modal.style.display = 'none'
		modal.setAttribute('aria-hidden', 'true')
		currentImageIndex = -1
		currentSectionImages = []
		updateNavVisibility()
	}

	zoomableImages.forEach((img) => {
		img.style.cursor = 'zoom-in'
		img.addEventListener('pointerup', () => openModal(img))
		img.addEventListener('click', () => openModal(img))
	})

	closeBtn.addEventListener('click', closeModal)

	if (prevBtn) {
		prevBtn.addEventListener('click', () => navigateGallery(-1))
	}

	if (nextBtn) {
		nextBtn.addEventListener('click', () => navigateGallery(1))
	}

	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal()
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeModal()
		if (e.key === 'ArrowLeft') navigateGallery(-1)
		if (e.key === 'ArrowRight') navigateGallery(1)
	})
})
