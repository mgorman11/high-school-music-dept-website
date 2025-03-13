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

  // ----- Slider for Achievement Cards -----
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const cards = document.querySelectorAll('.achievement-card');
  const totalCards = cards.length;

  // Ensure there are achievement cards before continuing
  if (totalCards === 0) {
    console.error("No achievement cards found.");
    return;
  }

  // Calculate the angle between each card (full circle divided by total cards)
  const angleIncrement = 360 / totalCards;
  let currentRotation = 0;
  
  // Position each card in a circle
  cards.forEach((card, index) => {
    card.style.transform = `rotateY(${index * angleIncrement}deg) translateZ(300px)`;
  });
  
  function updateRotation() {
    slider.style.transform = `rotateY(${currentRotation}deg)`;
  }
  
  nextButton.addEventListener('click', function(){
    currentRotation -= angleIncrement;
    updateRotation();
  });
  
  prevButton.addEventListener('click', function(){
    currentRotation += angleIncrement;
    updateRotation();
  });
  
  // Auto-rotate every 5 seconds
  setInterval(function(){
    currentRotation -= angleIncrement;
    updateRotation();
  }, 5000);
});


