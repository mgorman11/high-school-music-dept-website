document.addEventListener('DOMContentLoaded', function() {
  console.log("Welcome to the High School Music Department website!");

  // Get the container element for the event tiles
  const eventsContainer = document.getElementById('events-container');

  // Use the real-time listener to update events
  listenToEvents((error, events) => {
    if (error) {
      console.error("Error listening to events:", error);
      return;
    }
    // Clear the container before adding updated events
    eventsContainer.innerHTML = "";
    // Loop through events and create tiles for each
    events.forEach(event => {
      const tile = document.createElement('div');
      tile.classList.add('event-tile');

      // Create a title element
      const title = document.createElement('h3');
      title.textContent = event.title;
      tile.appendChild(title);

      // Create a date element
      const date = document.createElement('p');
      date.textContent = event.date;
      tile.appendChild(date);

      // Optionally add more details, like description
      if (event.description) {
        const description = document.createElement('p');
        description.textContent = event.description;
        tile.appendChild(description);
      }
      
      eventsContainer.appendChild(tile);
    });
  });
});

