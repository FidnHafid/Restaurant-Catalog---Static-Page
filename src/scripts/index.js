import 'regenerator-runtime';
import '../styles/main.css';

console.log('Hello Coders! :)');

let isMenuOpen = false;

function toggleNavbar() {
  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menuToggle');

  if (!isMenuOpen) {
    menu.style.transform = 'translateX(0)';
    menuToggle.setAttribute('aria-expanded', 'true');
    isMenuOpen = true;
  } else {
    menu.style.transform = 'translateX(-100%)';
    menuToggle.setAttribute('aria-expanded', 'false');
    isMenuOpen = false;
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  const skipLink = document.querySelector('.skip-to-content');
  const hamburgerButton = document.getElementById('menuToggle');
  const navbar = document.querySelector('.navbar');

  function moveSkipLinkToNavbar() {
    navbar.appendChild(skipLink);
    skipLink.classList.add('inside-navbar');
  }

  function moveSkipLinkOutsideNavbar() {
    const header = document.querySelector('header');
    header.appendChild(skipLink);
    skipLink.classList.remove('inside-navbar');
  }
  
  function handleSkipLinkFocus() {
    skipLink.style.top = '-40px';
    hamburgerButton.focus();
  }

  function handleSkipLinkBlur() {
    skipLink.style.top = '0';
  }

  skipLink.addEventListener('focus', handleSkipLinkFocus);
  skipLink.addEventListener('blur', handleSkipLinkBlur);

  skipLink.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      window.location.href = '#restaurants-list';
      event.preventDefault();
    }
  });

  var navbarToggleButton = document.querySelector(".navbar-toggler");
  navbarToggleButton.addEventListener('click', toggleNavbar);

  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const heroSlider = document.querySelector('.hero-slider');

  let currentIndex = 0;
  const slides = document.querySelectorAll('.hero-slider img');
  const totalSlides = slides.length;

  function goToSlide(index) {
    heroSlider.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  function goToNextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }

  function goToPrevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(totalSlides - 1);
    }
  }

  setInterval(goToNextSlide, 3000);
  prevBtn.addEventListener('click', goToPrevSlide);
  nextBtn.addEventListener('click', goToNextSlide);

  var homeLink = document.querySelector('.navbar-left a[href="/"]');
  homeLink.addEventListener('click', function(event) {
    event.preventDefault();
    var heroSlider = document.querySelector('.hero-slider');
    heroSlider.scrollIntoView({ behavior: 'smooth' });
    goToSlide(0);
    toggleNavbar();
  });

  var homeLink = document.querySelector('.navbar-menu a[href="/"]');
  homeLink.addEventListener('click', function(event) {
    event.preventDefault();
    var heroSlider = document.querySelector('.hero-slider');
    heroSlider.scrollIntoView({ behavior: 'smooth' });
    goToSlide(0);
    toggleNavbar();
  });

  try {
    const response = await fetch('./data/DATA.json');
    const dataJSON = await response.json();
    const restaurantsList = document.getElementById('restaurants-list');

    dataJSON.restaurants.forEach((restaurant, index) => {
      const restaurantElement = document.createElement('div');
      restaurantElement.innerHTML = `
        <h2>${restaurant.name}</h2>
        <div class="circle-container">
          <img src="${restaurant.pictureId}" alt="${restaurant.name}" data-index="${index}">
          <p class="restaurant-rating additional-rating-class">${restaurant.rating}</p>
        </div>
        <p>${restaurant.city}</p>
      `;
      restaurantElement.querySelector('img').classList.add('circle-image');
      restaurantsList.appendChild(restaurantElement);
    });

    // Tambahkan event listener untuk navigasi ke gambar-gambar dari data.json
    document.querySelectorAll('#restaurants-list img').forEach(img => {
      img.addEventListener('click', function() {
        const index = this.dataset.index;
        goToSlide(index);
      });
    });
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }

  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menuToggle');

  menu.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      if (menu.style.transform === 'translateX(-100%)') {
        toggleNavbar();
      }
      console.log('Menu dibuka melalui keyboard');
    }
  });

  document.addEventListener('click', function(event) {
    const targetElement = event.target;
    if (!menu.contains(targetElement) && !menuToggle.contains(targetElement) && isMenuOpen) {
      menu.style.transform = 'translateX(-100%)'; 
      menuToggle.setAttribute('aria-expanded', 'false'); 
      isMenuOpen = false; 
    }
  });

  menu.addEventListener('click', function(event) {
    const targetElement = event.target;
    
    if (targetElement.tagName === 'A' && isMenuOpen) {
      event.stopPropagation(); 
    }
  });

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.querySelectorAll('.navbar-menu li').forEach(item => {
    item.addEventListener('click', function() {
      const sectionId = this.dataset.target; 
      scrollToSection(sectionId); 
    });
  });

  let skipToContentLink = document.querySelector('.skip-to-content');
  skipLink.style.display = 'focus';

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab' && !skipToContentLink.classList.contains('show')) {
      skipToContentLink.classList.add('show');

    }
  });
  
  skipLink.addEventListener('blur', function() {
    skipLink.style.display = 'none';
  });
  
  
  skipLink.addEventListener('blur', function blurHandler() {
    skipLink.style.display = 'none';
    skipLink.removeEventListener('blur', blurHandler);
  });

  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      skipToContentLink.classList.add('show');
      document.removeEventListener('keydown', handleFirstTab);
    }
  }

  document.addEventListener('keydown', handleFirstTab);
});
