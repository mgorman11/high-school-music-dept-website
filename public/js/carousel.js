document.addEventListener('DOMContentLoaded', function() {
  const carouselContainer = document.querySelector('.card-carousel');

  // Fetch the card data from the JSON file
  fetch('data/cards.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(cardsData => {
      let cardsHTML = '';
      cardsData.forEach(card => {
        cardsHTML += `
          <div class="card" id="${card.id}">
            <div class="image-container">
              <img src="${card.img}" alt="${card.title}">
            </div>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
          </div>
        `;
      });
      // Insert the generated HTML into the carousel container
      carouselContainer.innerHTML = cardsHTML;

      // OPTIONAL: If you have additional carousel functionality (like drag or navigation),
      // you can initialize or reinitialize it here.
      // For example: initializeCarousel();
    })
    .catch(error => {
      console.error('Error fetching carousel data:', error);
    });
});
