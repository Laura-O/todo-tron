import moment from 'moment';
import 'moment-duration-format';

class Timer {
    constructor(config) {
        const { duration, unit, onDisplayChange, onTimerExpiration } = this.validateConfigObject(
            config,
        );

        this.initialDuration = this.getInitialDuration(duration, unit);
        this.duration = this.initialDuration;
        this.delay = 100;
        this.display = this.getTimeDisplay();
        this.interval = null;
        this.startTime = null;
        this.onDisplayChange = onDisplayChange;
        this.onTimerExpiration = onTimerExpiration;
    }

    start() {
        if (!this.interval) {
            this.startTime = moment();
            this.interval = setInterval(() => {
                this.duration -= this.delay;
                this.updateDisplay();
                this.listenForExpiration();
            }, this.delay);
            return cb ? cb() : null;
        }
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            return cb ? cb() : null;
        }
    }
}

export default Timer;
