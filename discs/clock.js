MINUTE_ANGLE = Math.PI * 2 / 60.0
HOUR_ANGLE = Math.PI * 2 / 12.0
OFFSET = Math.PI / 4
TEXT_OFFSET = 2 * OFFSET;

function createClock() {
    const clockElement = document.querySelector('.clock');
    
    const hourHand = document.createElement('div');
    hourHand.classList.add('hour');
    hourHand.classList.add('hand');
    hourHand.style.zIndex = 1;
    hourHand.style.rotate = -OFFSET+"rad";

    const minuteHand = document.createElement('div');
    minuteHand.classList.add('minute');
    minuteHand.classList.add('hand');
    minuteHand.style.zIndex = 2;
    minuteHand.style.rotate = -OFFSET+"rad";

    const secondHand = document.createElement('div');
    secondHand.classList.add('second');
    secondHand.classList.add('hand');
    secondHand.style.zIndex = 3;
    secondHand.style.rotate = -OFFSET+"rad";

    setInterval(() => {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        hourHand.style.rotate = (hours * HOUR_ANGLE - OFFSET) + "rad";
        minuteHand.style.rotate = (minutes * MINUTE_ANGLE - OFFSET) + "rad";
        secondHand.style.rotate = (seconds * MINUTE_ANGLE - OFFSET) + "rad";
    }, 1000);

    clockElement.appendChild(hourHand);
    clockElement.appendChild(minuteHand);
    clockElement.appendChild(secondHand);
}

document.addEventListener('DOMContentLoaded', createClock);