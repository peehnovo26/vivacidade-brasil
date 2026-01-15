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
   slide.style.opacity = '1';
   slide.style.zIndex = '10';
  } else {
   slide.style.opacity = '0';
   slide.style.zIndex = '0';
  }
 });

 // Update dots
 const dots = document.querySelectorAll('.carousel-dot');
 dots.forEach((dot, index) => {
  if (index === currentSlide) {
   dot.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  } else {
   dot.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  }
 });
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
 startCarousel();
});