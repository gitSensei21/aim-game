const startBtn = document.querySelector('#start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('#time-list'),
    timeEl = document.querySelector('#time'),
    colors = ['#1f0887', '#00a87e', '#a8003b', '#a80000', '#ffd500','#00c20d'],
    board = document.querySelector('.board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decraseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decraseTime() {
    if (time === 0) {
        finishGame()
    }
    else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function getRandomColor() { 
    const index =  Math.floor(Math.random() * colors.length);
 
    return colors[index];
  }

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
    timeEl.parentNode.classList.add('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div'),
        size = getRandomNumber(10, 60),
        { width, height } = board.getBoundingClientRect(),
        x = getRandomNumber(0, width - size),
        y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.background = getRandomColor();
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}