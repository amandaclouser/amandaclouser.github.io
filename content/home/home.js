/* skills */
// This would be part of your main.js file or a separate skills.js file

// Initialize progress bars animation
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress');
  
  if (progressBars.length > 0) {
      // Function to animate progress bars when they come into view
      const animateProgressBars = function() {
          progressBars.forEach(bar => {
              const barPosition = bar.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              
              if (barPosition.top < windowHeight * 0.9) {
                  // Get the target width from inline style
                  const targetWidth = bar.style.width;
                  
                  // First set width to 0
                  bar.style.width = '0';
                  
                  // Force a reflow
                  void bar.offsetWidth;
                  
                  // Then animate to target width
                  setTimeout(() => {
                      bar.style.width = targetWidth;
                  }, 100);
              }
          });
      };
      
      // Run on page load with a slight delay
      setTimeout(animateProgressBars, 500);
      
      // Also run on scroll
      window.addEventListener('scroll', animateProgressBars);
  }
}

// Initialize skill cards animation
function initSkillCards() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  if (skillCards.length > 0) {
      // Create an Intersection Observer to detect when skill cards are visible
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // Add visible class when element is in viewport
                  entry.target.classList.add('visible');
                  // Stop observing once animation is triggered
                  observer.unobserve(entry.target);
              }
          });
      }, {
          threshold: 0.1, // Trigger when at least 10% of the item is visible
          rootMargin: '0px 0px -50px 0px' // Slight offset so animation starts a bit earlier
      });
      
      // Start observing each skill card
      skillCards.forEach(card => {
          observer.observe(card);
      });
  }
}

// Initialize certification cards animation
function initCertCards() {
  const certCards = document.querySelectorAll('.certification-card');
  
  if (certCards.length > 0) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                  // Add a staggered delay based on index
                  setTimeout(() => {
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0)';
                      observer.unobserve(entry.target);
                  }, index * 150); // 150ms delay between each card
              }
          });
      }, {
          threshold: 0.1
      });
      
      // Set initial styles and start observing
      certCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          observer.observe(card);
      });
  }
}

// Call all initialization functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the skills page
  if (document.querySelector('.skills-categories')) {
      initProgressBars();
      initSkillCards();
      initCertCards();
  }

    // Set up the rotating titles
    const titles = [
        "Software Developer",
        "Technical Leader",
        "Product Owner",
        "Engineering Manager",
        "Problem Solver",
        "Software Developer" // Repeat the first one to make the loop smooth
    ];

    console.log("home dom content loaded");
    
    const dynamicText = document.querySelector('.dynamic-text');
    
    // Create the dynamic text content
    let dynamicHTML = titles.map(title => `<div>${title}</div>`).join('');
    dynamicText.innerHTML = dynamicHTML;
    
    // Adjust the animation duration based on number of titles
    const animationDuration = titles.length * 2; // 2 seconds per title
    document.querySelector('.dynamic-text').style.animation = `slideUpAndDown ${animationDuration}s ease infinite`;
});

