"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
class Duration {
    constructor(milliseconds) {
        if (milliseconds == null) {
            throw new Error("milliseconds is required");
        }
        if (isNaN(milliseconds)) {
            throw new Error("milliseconds must not be NaN");
        }
        if (typeof milliseconds !== "number") {
            throw new Error("milliseconds must be a number");
        }
        this._milliseconds = milliseconds;
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    static givenMilliseconds(milliseconds) {
        return new Duration(milliseconds);
    }
    static givenSeconds(seconds) {
        return Duration.givenMilliseconds(seconds * 1000);
    }
    static givenMinutes(minutes) {
        return Duration.givenSeconds(minutes * 60);
    }
    static givenHours(hours) {
        return Duration.givenMinutes(hours * 60);
    }
    static givenDays(days) {
        return Duration.givenHours(days * 24);
    }
    static givenInstantRange(start, end) {
        return new Duration(end.toEpochMilliseconds() - start.toEpochMilliseconds());
    }
    static ofMinimum() {
        return new Duration(0);
    }
    get isMinimum() {
        return this._milliseconds === 0;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Duration)) {
            return false;
        }
        return this._milliseconds === other._milliseconds;
    }
    toMilliseconds() {
        return this._milliseconds;
    }
    toSeconds() {
        return this._milliseconds / 1000;
    }
    toMinutes() {
        return this.toSeconds() / 60;
    }
    toHours() {
        return this.toMinutes() / 60;
    }
    toDays() {
        return this.toHours() / 24;
    }
    toDelay() {
        return new Promise((resolve) => setTimeout(resolve, this._milliseconds));
    }
    withAddedMilliseconds(ms) {
        if (ms == null) {
            throw new Error("ms is required");
        }
        return new Duration(this._milliseconds + ms);
    }
    withAddedSeconds(seconds) {
        if (seconds == null) {
            throw new Error("seconds is required");
        }
        return Duration.givenSeconds(this.toSeconds() + seconds);
    }
    withAddedMinutes(minutes) {
        if (minutes == null) {
            throw new Error("minutes is required");
        }
        return Duration.givenMinutes(this.toMinutes() + minutes);
    }
    withAddedHours(hours) {
        return Duration.givenHours(this.toHours() + hours);
    }
    withAddedDays(days) {
        return Duration.givenDays(this.toDays() + days);
    }
}
exports.Duration = Duration;
//# sourceMappingURL=index.js.map