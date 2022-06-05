const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
}

let intervalId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.stop.disabled = true;

refs.start.addEventListener('click', () => {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
})

refs.stop.addEventListener('click', () => {
  clearInterval(intervalId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
})
