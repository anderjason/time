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
    this._epochMilliseconds = epochMilliseconds;
  }

  isEqual(other: Instant): boolean {
    if (other == null) {
      return false;
    }

    return this._epochMilliseconds === other._epochMilliseconds;
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
