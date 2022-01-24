import { Duration } from "../Duration";

export class Instant {
  static isEqual(a: Instant, b: Instant): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  static ofNow(): Instant {
    return new Instant(new Date().getTime());
  }

  static givenEpochMilliseconds(epochMilliseconds: number): Instant {
    if (typeof epochMilliseconds === "string") {
      return new Instant(parseInt(epochMilliseconds));
    } else {
      return new Instant(epochMilliseconds);
    }
  }

  private _epochMilliseconds: number;

  private constructor(epochMilliseconds: number) {
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

  isEqual(other: Instant): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Instant)) {
      return false;
    }

    return this._epochMilliseconds === other._epochMilliseconds;
  }

  isAfter(other: Instant): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Instant)) {
      return false;
    }

    return this._epochMilliseconds > other._epochMilliseconds;
  }

  isBefore(other: Instant): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Instant)) {
      return false;
    }

    return this._epochMilliseconds < other._epochMilliseconds;
  }

  toEpochMilliseconds(): number {
    return this._epochMilliseconds;
  }

  toNativeDate(): Date {
    return new Date(this._epochMilliseconds);
  }

  toString(): string {
    return this.toEpochMilliseconds().toString();
  }

  withAddedDuration(duration: Duration): Instant {
    return new Instant(this._epochMilliseconds + duration.toMilliseconds());
  }
}
