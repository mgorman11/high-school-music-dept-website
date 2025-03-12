document.addEventListener('DOMContentLoaded', function() {              // Line 1: Open DOMContentLoaded event callback
  console.log("Welcome to the High School Music Department website!");

  // ----- Existing Dynamic Events Code (if any) -----
  const eventsContainer = document.getElementById('events-container');

  // Use the real-time listener (defined in firebase-events.js) to update events
  listenToEvents((error, events) => {                                    // Open listenToEvents callback
    if (error) {
      console.error("Error listening to events:", error);
      return;
    }

    // Clear the container once before adding new event cards
    eventsContainer.innerHTML = "";

    // Limit to 3 events and loop through them
    events.slice(0, 3).forEach(event => {                                 // Open forEach callback
      // Create the event card container (for horizontal layout)
      const card = document.createElement('div');
      card.classList.add('event-card');

      // Create a date badge element for the event
      const dateBadge = document.createElement('div');
      dateBadge.classList.add('event-date-badge');
      dateBadge.textContent = event.date; // Format this date as needed
      card.appendChild(dateBadge);

      // Create a content wrapper for title and description
      const content = document.createElement('div');
      content.classList.add('event-content');

      // Create a title element and append it to the content wrapper
      const title = document.createElement('h3');
      title.textContent = event.title;
      content.appendChild(title);

      // Optionally add a description element if available
      if (event.description) {
        const description = document.createElement('p');
        description.textContent = event.description;
        content.appendChild(description);
      }

      // Append the content wrapper to the card
      card.appendChild(content);

      // Append the card to the events container
      eventsContainer.appendChild(card);
    });                                                                  // Close forEach callback
  });                                                                    // Close listenToEvents callback

  var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto', // allows slides to adjust automatically
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1.2, // increase to scale the active slide up more
      slideShadows: true,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      }
    }
  });
});