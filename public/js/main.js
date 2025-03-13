document.addEventListener('DOMContentLoaded', function() {
  console.log("Welcome to the High School Music Department website!");

  // ----- Dynamic Events Code (if any) -----
  const eventsContainer = document.getElementById('events-container');
  listenToEvents((error, events) => {
    if (error) {
      console.error("Error listening to events:", error);
      return;
    }
    eventsContainer.innerHTML = "";
    events.slice(0, 3).forEach(event => {
      const card = document.createElement('div');
      card.classList.add('event-card');

      const dateBadge = document.createElement('div');
      dateBadge.classList.add('event-date-badge');
      dateBadge.textContent = event.date;
      card.appendChild(dateBadge);

      const content = document.createElement('div');
      content.classList.add('event-content');

      const title = document.createElement('h3');
      title.textContent = event.title;
      content.appendChild(title);

      if (event.description) {
        const description = document.createElement('p');
        description.textContent = event.description;
        content.appendChild(description);
      }
      card.appendChild(content);
      eventsContainer.appendChild(card);
    });
  });
});

document.addEventListener('DOMContentLoaded', function(){
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const cards = document.querySelectorAll('.achievement-card');
  const totalCards = cards.length;
  const visibleCards = 3; // Show 3 cards at a time
  let currentIndex = 0;
  
  function updateSlider() {
    // Calculate percentage shift: 100% / number of visible cards times currentIndex
    const shift = currentIndex * (100 / visibleCards);
    slider.style.transform = `translateX(-${shift}%)`;
  }
  
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

