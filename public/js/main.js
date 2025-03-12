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

  // ----- Removed: Custom Carousel Code for Achievements Section -----
  // Since the carousel functionality is now handled by React in carousel.js,
  // the following code is no longer needed:
  //
  // const track = document.querySelector('.carousel-track');
  // const slides = Array.from(track.children);
  // const nextButton = document.querySelector('.carousel-button.next');
  // const prevButton = document.querySelector('.carousel-button.prev');
  //
  // // Calculate the slide width (including right margin)
  // const slideWidth = slides[0].getBoundingClientRect().width + 20; // 20px is the right margin
  //
  // nextButton.addEventListener('click', function() {
  //   track.scrollBy({ left: slideWidth, behavior: 'smooth' });
  // });
  //
  // prevButton.addEventListener('click', function() {
  //   track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  // });
});

