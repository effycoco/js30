const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
let countdown;
function timer(seconds) {
  // clear any existing timer before start a new one
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return; // 不加会显示到-1，而不是0
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}
function toDisplay(number) {
  return number < 10 ? `0${number.toString()}` : number.toString();
}
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  displayContent = toDisplay(minutes) + ":" + toDisplay(seconds);
  document.title = displayContent; // tab标题
  timerDisplay.textContent = displayContent;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${toDisplay(minutes)}`;
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  console.log(seconds);

  timer(seconds);
}

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = parseInt(this.minutes.value);
  timer(mins * 60);
  this.reset();
});
