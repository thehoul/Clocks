MINUTE_ANGLE = Math.PI * 2 / 60.0
HOUR_ANGLE = Math.PI * 2 / 12.0
OFFSET = Math.PI / 2
DIGIT_WIDTH = 4;
DIGIT_HEIGHT = 6;

SHAPE_MAP = {
    '┌': [3, 30],
    '┘': [0, 45],
    '└': [0, 15],
    '┐': [9, 30],
    '―': [9, 15],
    '|': [0, 30],
    ' ': [0, 0]
}

DIGIT_MAPPING = {
    '0': ['┌','―','―','┐',
        '|','┌','┐','|',
        '|','|','|','|',
        '|','|','|','|',
        '|','└','┘','|',
        '└','―','―','┘'
    ],
    '1': ['┌','―','┐',' ',
        '└','┐','|',' ',
        ' ','|','|',' ',
        ' ','|','|',' ',
        '┌','┘','└','┐',
        '└','―','―','┘'
    ],
    '2': ['┌','―','―','┐',
        '└','―','┐','|',
        '┌','―','┘','|',
        '|','┌','―','┘',
        '|','└','―','┐',
        '└','―','―','┘'
    ],
    '3': ['┌','―','―','┐',
        '└','―','┐','|',
        '┌','―','┘','|',
        '└','―','┐','|',
        '┌','―','┘','|',
        '└','―','―','┘'
    ],
    '4': ['┌','┐','┌','┐',
        '|','|','|','|',
        '|','└','┘','|',
        '└','―','┐','|',
        ' ',' ','|','|',
        ' ',' ','└','┘'
    ],
    '5': ['┌','―','―','┐',
        '|','┌','―','┘',
        '|','└','―','┐',
        '└','―','┐','|',
        '┌','―','┘','|',
        '└','―','―','┘'
    ],
    '6': ['┌','―','―','┐',
        '|','┌','―','┘',
        '|','└','―','┐',
        '|','┌','┐','|',
        '|','└','┘','|',
        '└','―','―','┘'
    ],
    '7': ['┌','―','―','┐',
        '└','―','┐','|',
        ' ',' ','|','|',
        ' ',' ','|','|',
        ' ',' ','|','|',
        ' ',' ','└','┘'
    ],
    '8': ['┌','―','―','┐',
        '|','┌','┐','|',
        '|','└','┘','|',
        '|','┌','┐','|',
        '|','└','┘','|',
        '└','―','―','┘'
    ],
    '9': ['┌','―','―','┐',
        '|','┌','┐','|',
        '|','└','┘','|',
        '└','―','┐','|',
        '┌','―','┘','|',
        '└','―','―','┘'
    ],
}

class TinyClock {
    constructor() {
        this.clock = document.createElement('div');
        this.clock.classList.add('clock');

        this.hourHand = document.createElement('div');
        this.hourHand.classList.add('hand');
        this.hourHand.style.zIndex = 1;

        this.minuteHand = document.createElement('div');
        this.minuteHand.classList.add('hand');
        this.minuteHand.style.zIndex = 2;

        this.clock.appendChild(this.hourHand);
        this.clock.appendChild(this.minuteHand);
    }

    setTime(hours, minutes) {
        hours = hours % 12;
        this.hourHand.style.transform    = `rotate(${hours * HOUR_ANGLE - OFFSET}rad)`;
        this.minuteHand.style.transform  = `rotate(${minutes * MINUTE_ANGLE - OFFSET}rad)`;
    }
}


class Digit {
    constructor() {
        this.digit = document.createElement('div');
        this.digit.classList.add('digit')

        this.digit.style.gridTemplateColumns = `repeat(${DIGIT_WIDTH}, 1fr)`;
        this.digit.style.gridTemplateRows = `repeat(${DIGIT_HEIGHT}, 1fr)`;

        this.clocks = [];
        for(var i = 0; i < DIGIT_HEIGHT * DIGIT_WIDTH; i++) {
            const clock = new TinyClock();
            this.clocks.push(clock)

            clock.setTime(12, i);
            this.digit.appendChild(clock.clock);
        }
    }

    setValue(value) {
        const mappings = DIGIT_MAPPING[value];
        for (var i = 0; i < this.clocks.length; i++) {
            const time = SHAPE_MAP[mappings[i]];
            this.clocks[i].setTime(time[0], time[1]);
        }
    }
}

class Number {
    constructor() {
        this.number = document.createElement('div')
        this.number.classList.add('number')

        this.digit1 = new Digit();
        this.digit2 = new Digit();

        this.number.appendChild(this.digit1.digit)
        this.number.appendChild(this.digit2.digit)
    }

    setNumber(number) {
        this.digit1.setValue(number.at(0))
        this.digit2.setValue(number.at(1))
    }
}

function createClock() {
    const time =  document.querySelector('.time');

    const hoursDiv = new Number();
    const minutesDiv = new Number();
    const secondsDiv = new Number();
    

    setInterval(() => {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        hoursDiv.setNumber(hours)
        minutesDiv.setNumber(minutes)
        secondsDiv.setNumber(seconds)

    }, 1000);

    time.appendChild(hoursDiv.number);
    time.appendChild(minutesDiv.number);
    time.appendChild(secondsDiv.number);

}

document.addEventListener('DOMContentLoaded', createClock);