document.addEventListener('DOMContentLoaded', function() {
    const allEventsContainer = document.getElementById('all-events-container');
    
    fetchAllEvents((error, events) => {
      if (error) {
        console.error("Error fetching all events:", error);
        return;
      }
      
      // Clear container and add event tiles for all events
      allEventsContainer.innerHTML = "";
      events.forEach(event => {
        const tile = document.createElement('div');
        tile.classList.add('event-tile');
  
        const content = document.createElement('div');
        content.classList.add('content');
  
        const title = document.createElement('h3');
        title.textContent = event.title;
        content.appendChild(title);
  
        if (event.description) {
          const description = document.createElement('p');
          description.textContent = event.description;
          content.appendChild(description);
        }
  
        tile.appendChild(content);
  
        const date = document.createElement('p');
        date.classList.add('event-date');
        date.textContent = event.date;
        tile.appendChild(date);
  
        allEventsContainer.appendChild(tile);
      });
    });
  });
  