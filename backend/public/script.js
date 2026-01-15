// Arquivo zerado para novo início

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

let currentSlide = 0;
const slides = 5;
const slideInterval = 5000; // 5 segundos entre slides

// Auto-rotate carousel
function startCarousel() {
 setInterval(() => {
  nextSlide();
 }, slideInterval);
}

function nextSlide() {
 currentSlide = (currentSlide + 1) % slides;
 updateCarousel();
}

function goToSlide(index) {
 currentSlide = index;
 updateCarousel();
}

function updateCarousel() {
 // Update images
 const carouselSlides = document.querySelectorAll('.carousel-slide');
 carouselSlides.forEach((slide, index) => {
  if (index === currentSlide) {
   slide.classList.remove('opacity-0');
   slide.classList.add('opacity-100');
  } else {
   slide.classList.remove('opacity-100');
   slide.classList.add('opacity-0');
  }
 });

 // Update dots
 const dots = document.querySelectorAll('.carousel-dot');
 dots.forEach((dot, index) => {
  if (index === currentSlide) {
   dot.classList.remove('bg-white/30');
   dot.classList.add('bg-white/70');
  } else {
   dot.classList.remove('bg-white/70');
   dot.classList.add('bg-white/30');
  }
 });
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
 startCarousel();
});

});