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

