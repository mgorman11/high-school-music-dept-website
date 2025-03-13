document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.querySelector(".card-carousel");
  const cardsController = document.querySelector(".card-carousel + .card-controller");
  
  // Function to load card data from JSON and initialize the carousel
  function loadCards() {
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
        cardsContainer.innerHTML = cardsHTML;
        
        // Initialize the carousel after cards have been loaded
        new CardCarousel(cardsContainer, cardsController);
      })
      .catch(error => {
        console.error('Error fetching carousel data:', error);
      });
  }
  
  // Call the function to load cards and initialize the carousel
  loadCards();
  
    // --- Class Definitions ---
  
    class DraggingEvent {
      constructor(target = undefined) {
        this.target = target;
      }
      
      event(callback) {
        let handler;
        
        this.target.addEventListener("mousedown", e => {
          e.preventDefault();
          handler = callback(e);
          window.addEventListener("mousemove", handler);
          document.addEventListener("mouseleave", clearDraggingEvent);
          window.addEventListener("mouseup", clearDraggingEvent);
          
          function clearDraggingEvent() {
            window.removeEventListener("mousemove", handler);
            window.removeEventListener("mouseup", clearDraggingEvent);
            document.removeEventListener("mouseleave", clearDraggingEvent);
            handler(null);
          }
        });
        
        this.target.addEventListener("touchstart", e => {
          handler = callback(e);
          window.addEventListener("touchmove", handler);
          window.addEventListener("touchend", clearDraggingEvent);
          document.body.addEventListener("mouseleave", clearDraggingEvent);
          
          function clearDraggingEvent() {
            window.removeEventListener("touchmove", handler);
            window.removeEventListener("touchend", clearDraggingEvent);
            handler(null);
          }
        });
      }
      
      // Get the distance that the user has dragged
      getDistance(callback) {
        function distanceInit(e1) {
          let startingX, startingY;
          if ("touches" in e1) {
            startingX = e1.touches[0].clientX;
            startingY = e1.touches[0].clientY;
          } else {
            startingX = e1.clientX;
            startingY = e1.clientY;
          }
          
          return function(e2) {
            if (e2 === null) {
              return callback(null);
            } else {
              if ("touches" in e2) {
                return callback({
                  x: e2.touches[0].clientX - startingX,
                  y: e2.touches[0].clientY - startingY
                });
              } else {
                return callback({
                  x: e2.clientX - startingX,
                  y: e2.clientY - startingY
                });
              }
            }
          };
        }
        
        this.event(distanceInit);
      }
    }
    
    class CardCarousel extends DraggingEvent {
      constructor(container, controller = undefined) {
        super(container);
        
        this.container = container;
        this.controllerElement = controller;
        this.cards = container.querySelectorAll(".card");
        
        if (this.cards.length === 0) {
          console.error("No cards found in the carousel container!");
          return;
        }
        
        // Carousel data
        this.centerIndex = (this.cards.length - 1) / 2;
        this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
        this.xScale = {};
        
        // Resizing
        window.addEventListener("resize", this.updateCardWidth.bind(this));
        
        if (this.controllerElement) {
          this.controllerElement.addEventListener("keydown", this.controller.bind(this));
        }
        
        // Build initial layout and bind dragging events
        this.build();
        super.getDistance(this.moveCards.bind(this));
        
        // Start auto rotation
        this.autoRotate();
      }
      
      updateCardWidth() {
        this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
        this.build();
      }
      
      build(fix = 0) {
        for (let i = 0; i < this.cards.length; i++) {
          const x = i - this.centerIndex;
          const scale = this.calcScale(x);
          const scale2 = this.calcScale2(x);
          const zIndex = -Math.abs(i - this.centerIndex);
          const leftPos = this.calcPos(x, scale2);
          
          this.xScale[x] = this.cards[i];
          this.updateCards(this.cards[i], { x, scale, leftPos, zIndex });
        }
      }
      
      controller(e) {
        const temp = { ...this.xScale };
        if (e.keyCode === 39) {
          // Left arrow: move left (rotate right)
          for (let x in this.xScale) {
            const newX = (parseInt(x) - 1 < -this.centerIndex) ? this.centerIndex : parseInt(x) - 1;
            temp[newX] = this.xScale[x];
          }
        }
        if (e.keyCode === 37) {
          // Right arrow: move right (rotate left)
          for (let x in this.xScale) {
            const newX = (parseInt(x) + 1 > this.centerIndex) ? -this.centerIndex : parseInt(x) + 1;
            temp[newX] = this.xScale[x];
          }
        }
        this.xScale = temp;
        for (let x in temp) {
          const scale = this.calcScale(x),
                scale2 = this.calcScale2(x),
                leftPos = this.calcPos(x, scale2),
                zIndex = -Math.abs(x);
          this.updateCards(this.xScale[x], { x, scale, leftPos, zIndex });
        }
      }
      
      calcPos(x, scale) {
        let formula;
        if (x < 0) {
          formula = (scale * 100 - this.cardWidth) / 2;
        } else if (x > 0) {
          formula = 100 - (scale * 100 + this.cardWidth) / 2;
        } else {
          formula = 100 - (scale * 100 + this.cardWidth) / 2;
        }
        return formula;
      }
      
      updateCards(card, data) {
        if (data.x || data.x === 0) {
          card.setAttribute("data-x", data.x);
        }
        if (data.scale || data.scale === 0) {
          card.style.transform = `scale(${data.scale})`;
          card.style.opacity = data.scale === 0 ? 0 : 1;
        }
        if (data.leftPos || data.leftPos === 0) {
          card.style.left = `${data.leftPos}%`;
        }
        if (data.zIndex || data.zIndex === 0) {
          if (data.zIndex === 0) {
            card.classList.add("highlight");
          } else {
            card.classList.remove("highlight");
          }
          card.style.zIndex = data.zIndex;
        }
      }
      
      calcScale2(x) {
        let formula;
        if (x <= 0) {
          formula = 1 - (-1 / 5 * x);
        } else if (x > 0) {
          formula = 1 - (1 / 5 * x);
        }
        return formula;
      }
      
      calcScale(x) {
        const formula = 1 - 1 / 5 * Math.pow(x, 2);
        return formula <= 0 ? 0 : formula;
      }
      
      checkOrdering(card, x, xDist) {
        const original = parseInt(card.dataset.x);
        const rounded = Math.round(xDist);
        let newX = x;
        if (x !== x + rounded) {
          if (x + rounded > original) {
            if (x + rounded > this.centerIndex) {
              newX = ((x + rounded - 1) - this.centerIndex) - rounded + -this.centerIndex;
            }
          } else if (x + rounded < original) {
            if (x + rounded < -this.centerIndex) {
              newX = ((x + rounded + 1) + this.centerIndex) - rounded + this.centerIndex;
            }
          }
          this.xScale[newX + rounded] = card;
        }
        const temp = -Math.abs(newX + rounded);
        this.updateCards(card, { zIndex: temp });
        return newX;
      }
      
      moveCards(data) {
        let xDist;
        if (data != null) {
          this.container.classList.remove("smooth-return");
          xDist = data.x / 250;
        } else {
          this.container.classList.add("smooth-return");
          xDist = 0;
          for (let x in this.xScale) {
            this.updateCards(this.xScale[x], { x, zIndex: Math.abs(Math.abs(x) - this.centerIndex) });
          }
        }
        for (let i = 0; i < this.cards.length; i++) {
          const x = this.checkOrdering(this.cards[i], parseInt(this.cards[i].dataset.x), xDist),
                scale = this.calcScale(x + xDist),
                scale2 = this.calcScale2(x + xDist),
                leftPos = this.calcPos(x + xDist, scale2);
          this.updateCards(this.cards[i], { scale, leftPos });
        }
      }
      
      // --- Auto-Rotation Functionality ---
      autoRotate() {
        this.rotationInterval = setInterval(() => {
          // Simulate a right arrow key press to rotate the carousel.
          // In our controller, keyCode 37 rotates to the right.
          const event = new KeyboardEvent('keydown', { keyCode: 37 });
          this.controller(event);
        }, 3000); // Rotate every 3 seconds (adjust as needed)
      }
      
      // Optionally, you can add a method to stop auto-rotation on user interaction.
    }
    
    // --- Dynamic Data Loading & Initialization ---
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
        // Insert the generated HTML into the container
        cardsContainer.innerHTML = cardsHTML;
        
        // Now that the cards are inserted, initialize the carousel
        new CardCarousel(cardsContainer, cardsController);
      })
      .catch(error => {
        console.error('Error fetching carousel data:', error);
      });
  });