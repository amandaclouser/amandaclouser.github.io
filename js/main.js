document.addEventListener('DOMContentLoaded', function() {
  // Initialize the content loader
  const contentEl = document.getElementById('content');
  const navLinks = document.querySelectorAll('.nav-link');

  if (isHomePage()) {        
    console.log("is home");
    initDynamicTitlesWithRetry
}

window.dispatchEvent(new CustomEvent('pageChanged', { 
    detail: { isHome: true }
  }));
  
  // When navigating away from home
  window.dispatchEvent(new CustomEvent('pageChanged', { 
    detail: { isHome: false }
  }));

function isHomePage() {
    // Adapt this logic based on your site structure
    // For example:
    return window.location.pathname === '/' || 
           window.location.pathname === '/index.html' ||
           document.querySelector('.hero') !== null;
  }

  
  async function loadContent(page) {
    try {
        // Default to home if no page specified
        page = page || 'home';
        
        // Remove the # from the page name if present
        if (page.startsWith('#')) {
            page = page.substring(1);
        }
        
        // If page is empty, use home
        if (page === '') {
            page = 'home';
        }

        if (page === 'home' || page === '') {        
            console.log("is home");
            initDynamicTitlesWithRetry
        }
        
        const contentEl = document.getElementById('content');
        
        // Store current height to prevent layout shift
        const currentHeight = contentEl.offsetHeight;
        contentEl.style.minHeight = `${currentHeight}px`;
        
        // Remove any previously loaded page-specific stylesheets
        const oldPageStylesheets = document.querySelectorAll('link[data-page-style]');
        oldPageStylesheets.forEach(stylesheet => stylesheet.remove());
        
        // Remove any previously loaded page-specific scripts
        const oldPageScripts = document.querySelectorAll('script[data-page-script]');
        oldPageScripts.forEach(script => script.remove());
        
        // Load page-specific CSS if it exists
        const pageCssPath = `content/${page}/${page}.css`;
        
        // Check if the CSS file exists before attempting to load it
        try {
            const cssResponse = await fetch(pageCssPath, { method: 'HEAD' });
            if (cssResponse.ok) {
                // CSS file exists, load it
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = pageCssPath;
                linkElement.setAttribute('data-page-style', page);
                document.head.appendChild(linkElement);
            }
        } catch (error) {
            console.log(`No specific CSS for ${page} page`);
        }
        
        // Fetch the HTML content
        const response = await fetch(`content/${page}/${page}.html?t=${Date.now()}`);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${page}`);
        }
        
        const html = await response.text();
        
        // Update the content
        contentEl.innerHTML = html;
        
        // Load page-specific JS if it exists
        const pageJsPath = `./content/${page}/${page}.js`;
        
        // Check if the JS file exists before attempting to load it
        try {
            const jsResponse = await fetch(pageJsPath, { method: 'HEAD' });
            if (jsResponse.ok) {
                // JS file exists, load it
                const scriptElement = document.createElement('script');
                scriptElement.src = pageJsPath;
                scriptElement.setAttribute('data-page-script', page);
                document.body.appendChild(scriptElement);
                console.log("js page exists: ", {home})
            }
        } catch (error) {
            console.log(`No specific JS for ${page} page`);
        }
        
        // After content is loaded, reset the min-height
        setTimeout(() => {
            contentEl.style.minHeight = '';
        }, 300);
        
        // Update navigation, page title, etc.
        updateNavigation(page);
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
    } catch (error) {
        console.error('Error loading content:', error);
        document.getElementById('content').innerHTML = `<div class="error">Error loading content: ${error.message}</div>`;
    }
}


const readMoreBtn = document.getElementById('read-more-btn');
const expandedContent = document.getElementById('expanded-content');

if (readMoreBtn && expandedContent) {
    readMoreBtn.addEventListener('click', function() {
        expandedContent.classList.toggle('active');
        
        if (expandedContent.classList.contains('active')) {
            readMoreBtn.textContent = 'Read Less';
        } else {
            readMoreBtn.textContent = 'Read More';
        }
    });
} else {
    console.error('Read more button or expanded content not found');
}


// Helper function to update navigation state
function updateNavigation(page) {
    // Update the active link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${page}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update the page title
    document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} - Your Name`;
}
  
  // Function to initialize page-specific scripts
  function initPageScripts(page) {
      // You can add page-specific initialization here
      if (page === 'projects') {
          // Initialize project filters
          initProjectFilters();
      } else if (page === 'blog') {
          // Initialize blog features
          initBlogFilters();
      }
      
      // Initialize any dynamic elements that were loaded
      initDynamicElements();
  }
  
  // Initialize project filters
  function initProjectFilters() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');
      
      if (filterButtons.length > 0 && projectCards.length > 0) {
          filterButtons.forEach(button => {
              button.addEventListener('click', function() {
                  filterButtons.forEach(btn => btn.classList.remove('active'));
                  this.classList.add('active');
                  
                  const filterValue = this.getAttribute('data-filter');
                  
                  projectCards.forEach(card => {
                      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                          card.style.display = 'block';
                      } else {
                          card.style.display = 'none';
                      }
                  });
              });
          });
      }
  }

  function initDynamicTitles() {
    console.log("init dynamic titles");
    const dynamicText = document.querySelector('.dynamic-text');
    console.log("dynamicText: ", dynamicText);

    if (!dynamicText) return; // Exit if element doesn't exist
    
    const titles = [
        "Software Developer",
        "Technical Leader",
        "Product Owner",
        "Engineering Manager",
        "Problem Solver",
        "Software Developer"
    ];
    
    let dynamicHTML = titles.map(title => `<div>${title}</div>`).join('');
    dynamicText.innerHTML = dynamicHTML;
    
    const animationDuration = titles.length * 2;
    dynamicText.style.animation = `slideUpAndDown ${animationDuration}s ease infinite`;
}
  
  // Initialize blog filters
  function initBlogFilters() {
      // Similar to project filters
      // ...
  }
  
  // Initialize dynamic elements
  function initDynamicElements() {
      // Re-initialize elements like accordions, tabs, etc.
      // ...
  }
  
  // Initialize mobile menu
  function initMobileMenu() {
      const menuToggle = document.querySelector('.menu-toggle');
      const mobileMenu = document.querySelector('.mobile-menu');
      const closeMenu = document.querySelector('.close-menu');
      
      if (menuToggle && mobileMenu && closeMenu) {
          menuToggle.addEventListener('click', function() {
              mobileMenu.classList.add('active');
              document.body.style.overflow = 'hidden';
          });
          
          closeMenu.addEventListener('click', function() {
              mobileMenu.classList.remove('active');
              document.body.style.overflow = '';
          });
          
          const mobileLinks = mobileMenu.querySelectorAll('a');
          mobileLinks.forEach(link => {
              link.addEventListener('click', function() {
                  mobileMenu.classList.remove('active');
                  document.body.style.overflow = '';
              });
          });
      }
  }
  
  // Handle navigation clicks
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const href = this.getAttribute('href');
          
          // Update URL without full page reload
          window.history.pushState({}, '', href);
          
          // Load the content
          loadContent(href);
      });
  });
  
  // Handle back/forward browser navigation
  window.addEventListener('popstate', function() {
      loadContent(window.location.hash);
  });

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--x', `${x}%`);
    document.documentElement.style.setProperty('--y', `${y}%`);
});
  
  // Initialize the page
  initMobileMenu();
  
  // Load initial content based on URL hash
  loadContent(window.location.hash);
});

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

  function initDynamicTitlesWithRetry() {
    let attempts = 0;
    const maxAttempts = 10;
    const interval = 100; // ms between attempts
    
    const checkAndInit = function() {
      attempts++;
      console.log(`Attempt ${attempts} to find .dynamic-text`);
      
      const dynamicText = document.querySelector('.dynamic-text');
      console.log("Found:", dynamicText);
      
      if (dynamicText) {
        // Element found, initialize it
        const titles = [
          "Software Developer",
          "Technical Leader",
          "Product Owner",
          "Engineering Manager",
          "Problem Solver",
          "Software Developer" // Repeat the first one for smooth loop
        ];
        
        let dynamicHTML = titles.map(title => `<div>${title}</div>`).join('');
        dynamicText.innerHTML = dynamicHTML;
        
        const animationDuration = titles.length * 2; // 2 seconds per title
        dynamicText.style.animation = `slideUpAndDown ${animationDuration}s ease infinite`;
        
        console.log("Dynamic titles initialized successfully");
        return true; // Success
      }
      
      if (attempts >= maxAttempts) {
        console.error("Failed to find .dynamic-text after maximum attempts");
        return false; // Give up
      }
      
      // Try again after delay
      setTimeout(checkAndInit, interval);
    };
    
    // Start the checking process
    checkAndInit();
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

  window.addEventListener('load', function() {
    initDynamicTitles();
});

  


//   document.addEventListener('DOMContentLoaded', function() {
//     console.log("DOM Content Loaded");
//     checkForElement();
//   });
  
//   window.addEventListener('load', function() {
//     console.log("Window Fully Loaded");
//     checkForElement();
//   });
  
//   // Function to check for the element
//   function checkForElement() {
//     console.log("Checking for .dynamic-text element");
    
//     // Try with different selectors
//     const dynamicText = document.querySelector('.dynamic-text');
//     console.log("Found with .dynamic-text:", dynamicText);
    
//     // Look for similar elements
//     const allSpans = document.querySelectorAll('span');
//     console.log("All spans:", allSpans);
    
//     // Get HTML for inspection
//     const bodyHTML = document.body.innerHTML;
//     console.log("Body contains dynamic-text:", bodyHTML.includes('dynamic-text'));
    
//     // For each span, log its class for inspection
//     allSpans.forEach((span, index) => {
//       console.log(`Span ${index} classes:`, span.className);
//     });
//   }
  
  // Set up a continuous check for a short period
  let checkCount = 0;
  const intervalId = setInterval(() => {
    checkCount++;
    console.log(`Check ${checkCount} for element`);
    const dynamicText = document.querySelector('.dynamic-text');
    console.log("Found:", dynamicText);
    
    if (dynamicText || checkCount > 10) {
      clearInterval(intervalId);
      initDynamicTitles();
    }
  }, 500);

  function initDynamicTitles() {
    const titles = [
        "Technical Leader",
        "Software Developer",
        "Solution Architect",
        "People Leader",
        "Product Strategist"
      ];
      
      // Define colors for each title
      const colors = [
        "#5b7dfc", // Medium Blue
        "#ad7be9", // Soft Lavender
        "#e68bb4", // Dusty Rose
        "#64b6d9", // Steel Blue
        "#e0a587"  // Soft Terracotta
      ];
      
      const dynamicText = document.querySelector('.dynamic-text');
      if (!dynamicText) return;
      
      let currentIndex = 0;
      let direction = 1; // 1 for slide up, -1 for slide down
      
      // Set initial text and color
      dynamicText.textContent = titles[currentIndex];
      dynamicText.style.color = colors[currentIndex];
      
      // Function to slide text in/out
      function slideText() {
        // Slide current text out
        dynamicText.style.transform = `translateY(${-100 * direction}%)`;
        
        // After slide out completes, change text, color, and slide in
        setTimeout(() => {
          // Update to next title and color
          currentIndex = (currentIndex + 1) % titles.length;
          dynamicText.textContent = titles[currentIndex];
          dynamicText.style.color = colors[currentIndex];
          
          // Position for slide in (from opposite direction)
          dynamicText.style.transition = 'none';
          dynamicText.style.transform = `translateY(${100 * direction}%)`;
          
          // Force reflow
          void dynamicText.offsetWidth;
          
          // Restore transition and slide in
          dynamicText.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55), color 0.5s ease';
          dynamicText.style.transform = 'translateY(0)';
          
          // Alternate direction for variety
          direction *= -1;
        }, 800); // Match the transition duration
      }
      
      // Start with transition enabled for all properties
      dynamicText.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55), color 0.5s ease';
      
      // Slide text every 4 seconds
      setInterval(slideText, 3000);
}

function toggleContent() {
    const expandedContent = document.getElementById('expanded-content');
    const readMoreBtn = document.getElementById('read-more-btn');
    
    if (expandedContent && readMoreBtn) {
        expandedContent.classList.toggle('active');
        
        if (expandedContent.classList.contains('active')) {
            readMoreBtn.textContent = 'Read Less';
        } else {
            readMoreBtn.textContent = 'Read More';
        }
    }
}