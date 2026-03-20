document.addEventListener('DOMContentLoaded', function () {
	// Función para obtener la ruta HD de una imagen
	function getHDImagePath(originalSrc) {
		// Asume que las imágenes HD están en la misma carpeta con sufijo "_HD"
		// Ejemplo: "Fotos/imagen.webp" → "Fotos/imagen_HD.webp"
		const extension = originalSrc.split('.').pop()
		const pathWithoutExtension = originalSrc.replace(`.${extension}`, '')
		return `${pathWithoutExtension}_HD.${extension}`
	}

	// Selecciona todas las imágenes que quieras que se puedan agrandar
	document
		.querySelectorAll('.heroe__image, .gallery img, .box__box, .main__description-img')
		.forEach(function (img) {
			img.style.cursor = 'zoom-in'
			img.addEventListener('click', function () {
				const modal = document.getElementById('imageModal')
				const modalImg = document.getElementById('modalImg')

				modal.style.display = 'flex'

				// Si el alt es "Elementos del juego", usa la versión HD
				if (this.alt === 'Elementos del juego') {
					modalImg.src = getHDImagePath(this.src)
				} else {
					modalImg.src = this.src
				}

				modalImg.alt = this.alt
			})
		})

	// Cierra el modal al hacer click en la X o fuera de la imagen
	document.querySelector('.image-modal__close').onclick = function () {
		document.getElementById('imageModal').style.display = 'none'
	}

	document.getElementById('imageModal').onclick = function (e) {
		if (e.target === this) this.style.display = 'none'
	}
})
