document.addEventListener('DOMContentLoaded', function() {
  console.log("Welcome to the High School Music Department website!");

  // Get the container element for the event tiles
  const eventsContainer = document.getElementById('events-container');

  // Use the real-time listener (defined in firebase-events.js) to update events
  listenToEvents((error, events) => {
    if (error) {
      console.error("Error listening to events:", error);
      return;
    }

    // Clear the container once before adding new event tiles
    eventsContainer.innerHTML = "";

    // Limit to 3 events and loop through them
    events.slice(0, 3).forEach(event => {
      // Create the event tile container
      const tile = document.createElement('div');
      tile.classList.add('event-tile');

      // Create a content wrapper for title and description
      const content = document.createElement('div');
      content.classList.add('content');

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

      // Append the content wrapper to the tile
      tile.appendChild(content);

      // Create a date element with a specific class for styling
      const date = document.createElement('p');
      date.classList.add('event-date');
      date.textContent = event.date;
      tile.appendChild(date);

      // Append the tile to the events container
      eventsContainer.appendChild(tile);
    });
  });
});

