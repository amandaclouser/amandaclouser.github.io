document.addEventListener('DOMContentLoaded', function() {
  // Initialize the content loader
  const contentEl = document.getElementById('content');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Function to load content
  async function loadContent(page) {
      try {
          // Show loading spinner
          contentEl.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
          
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
          
          // Fetch the content
          const response = await fetch(`content/${page}.html`);
          
          if (!response.ok) {
              throw new Error(`Failed to load ${page}`);
          }
          
          const html = await response.text();
          
          // Update the content area
          contentEl.innerHTML = html;
          
          // Update the active link
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
          
          // Scroll to top
          window.scrollTo(0, 0);
          
          // Initialize any page-specific JavaScript
          initPageScripts(page);
          
      } catch (error) {
          console.error('Error loading content:', error);
          contentEl.innerHTML = '<div class="error">Error loading content. Please try again.</div>';
      }
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
  
  // Initialize the page
  initMobileMenu();
  
  // Load initial content based on URL hash
  loadContent(window.location.hash);
});