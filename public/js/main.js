document.addEventListener('DOMContentLoaded', function() {
  console.log("Welcome to the High School Music Department website!");

  // Get the container where events will be displayed
  const eventsList = document.getElementById('events-list');

  // Call the function to listen for events from Firestore
  listenToEvents((error, events) => {
    if (error) {
      console.error("Error listening to events:", error);
      return;
    }
    // Clear the list before adding new events
    eventsList.innerHTML = "";
    // Loop through each event and create a list item
    events.forEach(event => {
      const li = document.createElement('li');
      li.textContent = `${event.title} - ${event.date}`;
      eventsList.appendChild(li);
    });
  });
});
