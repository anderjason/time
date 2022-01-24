"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instant = void 0;
class Instant {
    constructor(epochMilliseconds) {
        if (epochMilliseconds == null) {
            throw new Error("epochMilliseconds is required");
        }
        if (isNaN(epochMilliseconds)) {
            throw new Error("epochMilliseconds must not be NaN");
        }
        if (typeof epochMilliseconds !== "number") {
            throw new Error("epochMilliseconds must be a number");
        }
        this._epochMilliseconds = epochMilliseconds;
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
    static ofNow() {
        return new Instant(new Date().getTime());
    }
    static givenEpochMilliseconds(epochMilliseconds) {
        if (typeof epochMilliseconds === "string") {
            return new Instant(parseInt(epochMilliseconds));
        }
        else {
            return new Instant(epochMilliseconds);
        }
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Instant)) {
            return false;
        }
        return this._epochMilliseconds === other._epochMilliseconds;
    }
    isAfter(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Instant)) {
            return false;
        }
        return this._epochMilliseconds > other._epochMilliseconds;
    }
    isBefore(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Instant)) {
            return false;
        }
        return this._epochMilliseconds < other._epochMilliseconds;
    }
    toEpochMilliseconds() {
        return this._epochMilliseconds;
    }
    toNativeDate() {
        return new Date(this._epochMilliseconds);
    }
    toString() {
        return this.toEpochMilliseconds().toString();
    }
    withAddedDuration(duration) {
        return new Instant(this._epochMilliseconds + duration.toMilliseconds());
    }
}
exports.Instant = Instant;
//# sourceMappingURL=index.js.map