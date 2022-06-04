import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import Notiflix from 'notiflix';

const refs = {
  startButton: document.querySelector('[data-start]'),
  daysDisplay: document.querySelector('[data-days]'),
  hoursDisplay: document.querySelector('[data-hours]'),
  minutesDisplay: document.querySelector('[data-minutes]'),
  secondsDisplay: document.querySelector('[data-seconds]'),
}



const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();

    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future', {
        position: 'center-top',
        distance: '60px',
      });
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};

const dateTimePicker = flatpickr("#datetime-picker", options);

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onStartButtonCLick);

let intervalId;
let isActive = false;

function onStartButtonCLick() {
  if (isActive) {
    return;
  }

  const selectedDateTime = dateTimePicker.latestSelectedDateObj.getTime();

  intervalId = setInterval(() => {
    isActive = true;
    const currentDateTime = Date.now();
    const remainingTime = selectedDateTime - currentDateTime;
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    refs.daysDisplay.innerHTML = days;
    refs.hoursDisplay.innerHTML = hours;
    refs.minutesDisplay.innerHTML = minutes;
    refs.secondsDisplay.innerHTML = seconds;

    if (remainingTime <= 1000) {
      clearInterval(intervalId);
      isActive = false;
    }
  }, 1000)
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


