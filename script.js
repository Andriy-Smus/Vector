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

  let reges = /\S+@\S+\.\S+/;

  if (!reges.test(email)) {
      document.querySelector('.error-email').style.display = 'block';
      return false;
  } else {
      document.querySelector('.error-email').style.display = 'none';
  }

  return true;
}

  // $(document).ready(function() {

  // 	//E-mail Ajax Send
  // 	$("form").submit(function() { //Change
  // 		var th = $(this);
  // 		$.ajax({
  // 			type: "POST",
  // 			url: "mail.php", //Change
  // 			data: th.serialize()
  // 		}).done(function() {
  // 			alert("Thank you!");
  // 			setTimeout(function() {
  // 				// Done Functions
  // 				th.trigger("reset");
  // 			}, 1000);
  // 		});
  // 		return false;
  // 	});

  // });
  document.getElementById('w0').addEventListener('submit', function (e) {
    e.preventDefault(); // Зупинка стандартної поведінки форми
    if (validateForm()) {
      // Ваш код для відправки даних форми або виклику Ajax-запиту
      // Наприклад, виклик функції, яка відправляє дані на сервер
      // sendFormData();
      this.reset();
    }
  });

const translateEN = document.querySelectorAll('.translate-en');
const translateUA = document.querySelectorAll('.translate-ua');

const allLang = ['ua', 'en'];
// Отримуємо обраний клас з localStorage
const selectedLang = localStorage.getItem('selectedLang');

// Позначаємо елемент збереженим класом
if (selectedLang) {
  const selectedElement = document.querySelectorAll('.' + selectedLang);
  if (selectedElement.length > 0) {
    selectedElement.forEach(element => {
      element.classList.add('translate-active');
    })
  }
}

translateUA.forEach(element => {
  element.addEventListener('click', changeURLLanguage);
})
translateEN.forEach(element => {
  element.addEventListener('click', changeURLLanguage);
})


function changeURLLanguage() {
  // Зберігаємо обраний клас в localStorage
  localStorage.setItem('selectedLang', this.classList[0]);
  
  // Видаляємо клас translate-active у всіх елементів
  // translateEN.classList.remove('translate-active');
  // translateUA.classList.remove('translate-active');
  translateUA.forEach(element => {
    element.classList.remove('translate-active');
  })
  translateEN.forEach(element => {
    element.classList.remove('translate-active');
  })

  
  // Додаємо клас translate-active до обраного елемента
  this.classList.add('translate-active');

  let lang = this.id;
  location.href = window.location.pathname + '#' +lang;
  location.reload();
}

function changeLanguage() {
  let getlocalStorage = localStorage.getItem('selectedLang');
  console.log(getlocalStorage)
  if(getlocalStorage == 'translate-en') {
    translateUA.forEach(element => {
      element.classList.remove('translate-active');
    })
    translateEN.forEach(element => {
      element.classList.add('translate-active');
    })
  }
  if(getlocalStorage == 'translate-ua') {
    translateEN.forEach(element => {
      element.classList.remove('translate-active');
    })
    translateUA.forEach(element => {
      element.classList.add('translate-active');
    })
  }

  let hash = window.location.hash;
  hash = hash.substring(1);
  console.log(hash)

  if(!allLang.includes(hash)) {
    location.href = window.location.pathname + '#ua';
    location.reload();
    localStorage.setItem('selectedLang', 'translate-ua');
  }
  document.querySelector('title').innerHTML = langArr['unit'][hash];
  // document.querySelector('.lng-contact').innerHTML = langArr['contact'][hash];
  for (let key in langArr) {
    let elem = document.querySelector('.lng-' + key);
    // let elem = document.querySelector('.' + key);
    if(elem) {
      elem.innerHTML = langArr[key][hash];
      elem.setAttribute('data-text', elem.innerHTML);
      elem.setAttribute('placeholder', langArr[key][hash]);
    }
    // document.querySelector('lng-' + key).innerHTML = langArr[key][hash];
  }
}
changeLanguage();
