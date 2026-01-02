let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1/20;

const flipbook = document.querySelector('.flipbook');
const pages = document.querySelectorAll('.flipbook .page');

let currentPage = 0;
let interval = null;

function flipPage() {
  if (currentPage >= pages.length) {
    pages.forEach(page => page.classList.remove('flipped'));
    currentPage = 0;
    return;
  }

  pages[currentPage].classList.add('flipped');
  currentPage++;
}


function startFlip() {
  if (!interval) interval = setInterval(flipPage, 1500);
}

function stopFlip() {
  clearInterval(interval);
  interval = null;
}


flipbook.addEventListener('mouseenter', stopFlip);
flipbook.addEventListener('mouseleave', startFlip);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startFlip();
        observer.unobserve(flipbook);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(flipbook);

function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) {
        const isOdd  = i % 2 !== 0;
        const boolInt = isOdd ? -1 : 1
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')
    loading.classList += " modal__overlay--visible"

    emailjs
        .sendForm(
            'service_3nyjr32',
            'template_kmpjhuc',
            event.target,
            'RjPmjINvQvyghwuH6'
        ).then (() => {
            loading.classList.remove(".modal__overlay--visible")
            success.classList += " modal__overlay--visible"
        }).catch (() => {
            loading.classList.remove(".modal__overlay--visible")
            alert (
                "The email service is temporarily unavailable. Please contact me directly at k.hargreaves.design@gmail.com."
            )
        })
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false
        return document.body.classList.remove ("modal--open")
    }
    isModalOpen = true
    document.body.classList += " modal--open"
}