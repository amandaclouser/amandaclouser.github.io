// Beyond Coding page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Beyond Coding page loaded');
  
  // Initialize animations for gallery items
  initGalleryAnimations();
  
  // Initialize image hover effects
  initImageHoverEffects();
});

// Function to initialize gallery animations
function initGalleryAnimations() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length > 0) {
      // Create an Intersection Observer to detect when gallery items are visible
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // Add animation class when element is visible
                  entry.target.classList.add('animate-in');
                  // Stop observing once animation is triggered
                  observer.unobserve(entry.target);
              }
          });
      }, {
          root: null, // viewport
          threshold: 0.2, // trigger when 20% visible
          rootMargin: '0px'
      });
      
      // Observe each gallery item
      galleryItems.forEach(item => {
          observer.observe(item);
          
          // Add hover event for captions
          const caption = item.querySelector('.gallery-caption');
          if (caption) {
              item.addEventListener('mouseenter', () => {
                  caption.style.transform = 'translateY(0)';
              });
              
              item.addEventListener('mouseleave', () => {
                  caption.style.transform = 'translateY(100%)';
              });
          }
      });
  }
}

// Function to initialize image hover effects
function initImageHoverEffects() {
  // Book covers zoom effect
  const bookCovers = document.querySelectorAll('.book-cover');
  bookCovers.forEach(cover => {
      cover.addEventListener('mouseenter', () => {
          const img = cover.querySelector('img');
          if (img) {
              img.style.transform = 'scale(1.05)';
          }
      });
      
      cover.addEventListener('mouseleave', () => {
          const img = cover.querySelector('img');
          if (img) {
              img.style.transform = 'scale(1)';
          }
      });
  });
  
  // Destination cards hover effect
  const destinationCards = document.querySelectorAll('.destination-card');
  destinationCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = '0 10px 25px var(--shadow-color)';
      });
      
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '0 3px 10px var(--shadow-color)';
      });
  });
  
  // Album hover effect
  const albums = document.querySelectorAll('.album');
  albums.forEach(album => {
      album.addEventListener('mouseenter', () => {
          album.style.transform = 'translateY(-3px)';
          album.style.boxShadow = '0 5px 15px var(--shadow-color)';
      });
      
      album.addEventListener('mouseleave', () => {
          album.style.transform = 'translateY(0)';
          album.style.boxShadow = '0 2px 8px var(--shadow-color)';
      });
  });
}

// Optional: Add a simple slideshow for fishing images if multiple images are added
function initFishingSlideshow() {
  const fishingImages = document.querySelectorAll('.fishing-slideshow img');
  let currentImageIndex = 0;
  
  if (fishingImages.length > 1) {
      // Hide all images except the first one
      fishingImages.forEach((img, index) => {
          if (index !== 0) {
              img.style.display = 'none';
          }
      });
      
      // Function to show next image
      function showNextImage() {
          fishingImages[currentImageIndex].style.display = 'none';
          currentImageIndex = (currentImageIndex + 1) % fishingImages.length;
          fishingImages[currentImageIndex].style.display = 'block';
      }
      
      // Change image every 5 seconds
      setInterval(showNextImage, 5000);
  }
}

// Optional: Add interactive map for travel section
// This would typically use a library like Leaflet.js or Google Maps
// For demonstration purposes, this is just a placeholder
function initTravelMap() {
  console.log('Travel map would be initialized here with a mapping library');
  
  // Example of what this might look like with a library like Leaflet.js:
  /*
  const map = L.map('travel-map').setView([20, 0], 2);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  // Add markers for visited places
  const visitedPlaces = [
      { name: 'Japan', lat: 35.6762, lng: 139.6503 },
      { name: 'Norway', lat: 60.4720, lng: 8.4689 },
      { name: 'New Zealand', lat: -40.9006, lng: 174.8860 }
  ];
  
  visitedPlaces.forEach(place => {
      L.marker([place.lat, place.lng])
          .addTo(map)
          .bindPopup(place.name);
  });
  */
}