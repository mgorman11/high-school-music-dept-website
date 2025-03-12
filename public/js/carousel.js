document.addEventListener('DOMContentLoaded', function() {
    // Get references to key elements
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel .slide');
    const prevBtn = document.querySelector('.carousel-container button.prev');
    const nextBtn = document.querySelector('.carousel-container button.next');
  
    // Set up current slide index; assuming first slide is active
    let currentSlide = 0;
    const totalSlides = slides.length;
  
    // Get the width of one slide (assumes all slides have equal width)
    const slideWidth = slides[0].clientWidth;
  
    // Function to update the carousel position and active slide class
    function updateCarousel() {
      // Remove "active" class from all slides
      slides.forEach(slide => slide.classList.remove('active'));
      // Add "active" class to the current slide
      slides[currentSlide].classList.add('active');
  
      // Translate the carousel so the current slide is in view
      carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  
    // Event listener for the "Next" button
    nextBtn.addEventListener('click', function() {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
      }
    });
  
    // Event listener for the "Prev" button
    prevBtn.addEventListener('click', function() {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });
  });
  