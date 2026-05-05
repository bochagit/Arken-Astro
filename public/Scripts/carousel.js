// Carrusel para la sección "Organiza torneos"
// Las fotos se cargan dinámicamente desde el atributo data-carousel-images
// Formato: data-carousel-images="/Fotos/foto1.webp,/Fotos/foto2.webp,/Fotos/foto3.webp"
let carouselImages = [];

function initializeCarousel() {
	const imgElement = document.querySelector('.torneos__carousel-image');
	const prevBtn = document.getElementById('carousel-prev');
	const nextBtn = document.getElementById('carousel-next');
	const carouselContainer = document.querySelector('.torneos__carousel-container');
	
	if (!imgElement || !prevBtn || !nextBtn) return;
	
	// Cargar imágenes del atributo data o usar la imagen inicial
	if (carouselContainer && carouselContainer.dataset.carouselImages) {
		carouselImages = carouselContainer.dataset.carouselImages.split(',').map(img => img.trim());
	} else if (imgElement.src && imgElement.src !== window.location.href) {
		// Si no hay atributo, usar solo la imagen actual
		carouselImages = [imgElement.src];
	} else {
		return; // Sin imágenes, no hacer nada
	}

	let currentIndex = 0;

	const updateImage = () => {
		if (carouselImages.length > 0) {
			imgElement.src = carouselImages[currentIndex];
			imgElement.dataset.index = currentIndex;
		}
	};

	prevBtn.addEventListener('click', () => {
		currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
		updateImage();
	});

	nextBtn.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % carouselImages.length;
		updateImage();
	});
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeCarousel);
} else {
	initializeCarousel();
}
