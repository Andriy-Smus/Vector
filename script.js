document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loaded');
  // UIkit.slideshow(element, options);
});


document.querySelectorAll('.hamburger').forEach(block => {
  block.addEventListener('click', function() {
    document.querySelector('.side-menu').classList.toggle('active');
  })
});
document.querySelector('.menu-close-button-wrapper').addEventListener('click', function() {
  document.querySelector('.side-menu').classList.remove('active');
});

let chapters = document.querySelectorAll('.chapter');
chapters.forEach(function(chapter) {
  chapter.addEventListener('click', function() {
    document.querySelector('.side-menu').classList.remove('active');
  });
});

document.addEventListener('click', function(event) {
  const menuContainer = document.querySelector('.menu-container');
  const sideMenu = document.querySelector('.side-menu');
  const active = document.querySelector('.active');
  
  // Перевірка, чи клік був здійснений поза .menu-container
  if (!menuContainer.contains(event.target) && active.contains(event.target)) {
    // Перевірка, чи .side-menu має клас 'active'
    if (sideMenu.classList.contains('active')) {
      // Видалення класу 'active' з .side-menu, якщо він був доданий
      sideMenu.classList.remove('active');
    }
  }
});

// Функція для анімації чисел
function animateCounters() {
  const countElements = document.querySelectorAll('.count');
  
  countElements.forEach(element => {
    const endValue = parseInt(element.getAttribute('data-value'));
    let startValue = 0;
    const duration = 2000; // тривалість анімації (2 секунди)
    const stepTime = 10; // крок анімації (10 мілісекунд)
    const increment = endValue / (duration / stepTime);
    
    function updateNumber() {
      startValue += increment;
      element.textContent = Math.floor(startValue);
      if (startValue < endValue) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = endValue; // Встановлюємо точне значення в кінці
      }
    }
    
    updateNumber();
  });
}

// Виклик функції animateCounters() коли елемент потрапляє у видиму частину вікна
const vectorImgContainer = document.querySelector('.vector-img-container');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(vectorImgContainer); // Зупиняємо спостереження після першого спрацювання
    }
  });
});

observer.observe(vectorImgContainer);

function validateForm() {
  let name = document.getElementById('contactform-name').value;
  let email = document.getElementById('contactform-email').value;

  if (name.trim() === '') {
      document.querySelector('.error-name').style.display = 'block';
      document.querySelector('.error-name')
      return false;
  } else {
      document.querySelector('.error-name').style.display = 'none';
  }

  if (email.trim() === '') {
      document.querySelector('.error-email').style.display = 'block';
      return false;
  } else {
      document.querySelector('.error-email').style.display = 'none';
  }

  return true;
}


