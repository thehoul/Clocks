MINUTE_ANGLE = Math.PI * 2 / 60.0
HOUR_ANGLE = Math.PI * 2 / 12.0
OFFSET = Math.PI / 2

function createClock() {
    const clockElement = document.querySelector('.clock');
    
    const hourHand = document.createElement('div');
    hourHand.classList.add('hour');
    hourHand.classList.add('hand');
    hourHand.style.zIndex = 3;
    clockElement.appendChild(hourHand);

    const minuteHand = document.createElement('div');
    minuteHand.classList.add('minute')
    minuteHand.classList.add('hand')
    minuteHand.style.zIndex = 2;
    clockElement.appendChild(minuteHand)

    const secondHand = document.createElement('div');
    secondHand.classList.add('second')
    secondHand.classList.add('hand')
    secondHand.style.zIndex = 1;
    clockElement.appendChild(secondHand)

    setInterval(() => {

        now = new Date()

        hour = now.getHours() % 12;
        minute = now.getMinutes();
        second = now.getSeconds();
        console.log(hour, minute, second);

        hourHand.style.rotate = (hour * HOUR_ANGLE - OFFSET) + "rad";
        minuteHand.style.rotate = ((minute+1) * MINUTE_ANGLE - OFFSET) + "rad";
        secondHand.style.rotate = (second * MINUTE_ANGLE - OFFSET) + "rad";
    }, 1000);


    const nbTicks = 60;
    const TICK_ANGLE = Math.PI * 2 / nbTicks;
    for (var i = 0; i < nbTicks; i++) {
        if (i % 5 != 0) {
            continue;
        }
        
        const tick = document.createElement('div');
        tick.classList.add('tick')
        tick.style.zIndex = 4;

        if (i % 15 == 0) {
            tick.classList.add('thick');
        }

        const angle = (i * TICK_ANGLE - OFFSET) + "rad";
        tick.style.transform = `rotate(${angle}) translate(20rem, 0)`;
        console.log(angle)
        clockElement.appendChild(tick);
    }
}

document.addEventListener('DOMContentLoaded', createClock);