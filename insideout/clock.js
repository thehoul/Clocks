MINUTE_ANGLE = Math.PI * 2 / 60.0
HOUR_ANGLE = Math.PI * 2 / 12.0
OFFSET = Math.PI / 2

function createClock() {
    const clockElement = document.querySelector('.clock');
    
    const hourHand = document.createElement('div');
    hourHand.classList.add('hour');
    hourHand.classList.add('hand');
    hourHand.style.zIndex = 1;

    const minuteHand = document.createElement('div');
    minuteHand.classList.add('minute');
    minuteHand.classList.add('hand');
    minuteHand.style.zIndex = 2;

    const secondHand = document.createElement('div');
    secondHand.classList.add('second');
    secondHand.classList.add('hand');
    secondHand.style.zIndex = 3;

    setInterval(() => {


        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        secondHand.style.transform  = `translate(-50%, -50%) rotate(${(seconds * MINUTE_ANGLE - OFFSET)}rad) translate(calc(14.5rem - 50%), 0)`;
        minuteHand.style.transform  = `translate(-50%, -50%) rotate(${(minutes * MINUTE_ANGLE - OFFSET)}rad) translate(calc(16.5rem - 50%), 0)`;
        hourHand.style.transform    = `translate(-50%, -50%) rotate(${(hours * HOUR_ANGLE - OFFSET)}rad) translate(calc(18.5rem - 50%), 0)`;
    }, 1000);

    clockElement.appendChild(secondHand);
    clockElement.appendChild(minuteHand);
    clockElement.appendChild(hourHand);

    // Draw ticks
    const nbTicks = 60;
    const TICK_ANGLE = Math.PI * 2 / nbTicks;
    for (var i = 0; i < nbTicks; i++) {    
        const tick = document.createElement('div');
        tick.classList.add('tick')
        tick.style.zIndex = 4;

        if (i % 15 == 0) {
            tick.classList.add('thick');
        } else if (i % 5 == 0) {
            tick.classList.add('medium');
        } else {
            tick.classList.add('thin');
        }

        const angle = (i * TICK_ANGLE - OFFSET) + "rad";
        tick.style.transform = `translate(-50%, -50%) rotate(${angle}) translate(calc(12rem - 50%), 0)`;
        clockElement.appendChild(tick);
    }
}

document.addEventListener('DOMContentLoaded', createClock);