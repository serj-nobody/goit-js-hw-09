import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          position: 'center-top',
          distance: '120px',
        }));
      } else {
        reject(Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          position: 'center-top',
          distance: '120px',
        }));
      }
    }, delay);
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const initialDelay = Number(form.elements.delay.value);
  const amount = form.elements.amount.value;
  const step = Number(form.elements.step.value);
  let delay = initialDelay - step;

  setTimeout(() => {
    for (let i = 0; i < amount; i += 1) {
      const position = i + 1;
      delay += step;
  
      createPromise(position, delay)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, initialDelay);
});







