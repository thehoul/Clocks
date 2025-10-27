ANGLE_60TH = Math.PI * 2 / 60.0;
ANGLE_12TH = Math.PI * 2 / 12.0;
OFFSET = Math.PI / 2.0;

function createClock() {
    const clock =  document.querySelector('.clock');

    const hoursHand = document.createElement('div');
    hoursHand.classList.add('hand');
    hoursHand.classList.add('hours');

    const minutesHand = document.createElement('div');
    minutesHand.classList.add('hand');
    minutesHand.classList.add('minutes');

    const secondsHand = document.createElement('div');
    secondsHand.classList.add('hand');
    secondsHand.classList.add('seconds');
    

    setInterval(() => {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        hoursHand.style.transform   = `rotate(${hours * ANGLE_12TH - OFFSET}rad)`
        minutesHand.style.transform = `rotate(${minutes * ANGLE_60TH - OFFSET}rad)`
        secondsHand.style.transform = `rotate(${seconds * ANGLE_60TH - OFFSET}rad)`

    }, 1000);

    clock.appendChild(hoursHand);
    clock.appendChild(minutesHand);
    clock.appendChild(secondsHand);

}

document.addEventListener('DOMContentLoaded', createClock);