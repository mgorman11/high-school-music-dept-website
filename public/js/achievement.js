document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to the High School Music Department website!");
  
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const cards = document.querySelectorAll('.achievement-card');
    const totalCards = cards.length;
    const visibleCards = 3; // Show 3 cards at a time
    let currentIndex = 0;
    
    // Function to update slider position
    function updateSlider() {
      const shift = currentIndex * (100 / visibleCards);
      slider.style.transform = `translateX(-${shift}%)`;
    }
    
    // Navigation Logic
    nextButton.addEventListener('click', function(){
      if(currentIndex < totalCards - visibleCards){
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to start
      }
      updateSlider();
    });
    
    prevButton.addEventListener('click', function(){
      if(currentIndex > 0){
        currentIndex--;
      } else {
        currentIndex = totalCards - visibleCards; // Loop to end
      }
      updateSlider();
    });
    
    // Optional: Auto-rotate every 5 seconds
    setInterval(function(){
      if(currentIndex < totalCards - visibleCards){
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider();
    }, 5000);
  });
  