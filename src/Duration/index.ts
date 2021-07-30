import { Instant } from "../Instant";

export class Duration {
  private _milliseconds: number;

  static isEqual(a: Duration, b: Duration): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  static givenMilliseconds(milliseconds: number): Duration {
    return new Duration(milliseconds);
  }

  static givenSeconds(seconds: number): Duration {
    return Duration.givenMilliseconds(seconds * 1000);
  }

  static givenMinutes(minutes: number): Duration {
    return Duration.givenSeconds(minutes * 60);
  }

  static givenHours(hours: number): Duration {
    return Duration.givenMinutes(hours * 60);
  }

  static givenDays(days: number): Duration {
    return Duration.givenHours(days * 24);
  }

  static givenInstantRange(start: Instant, end: Instant): Duration {
    return new Duration(
      end.toEpochMilliseconds() - start.toEpochMilliseconds()
    );
  }

  static ofMinimum(): Duration {
    return new Duration(0);
  }

  private constructor(milliseconds: number) {
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

  get isMinimum(): boolean {
    return this._milliseconds === 0;
  }

  isEqual(other: Duration): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Duration)) {
      return false;
    }

    return this._milliseconds === other._milliseconds;
  }

  toMilliseconds(): number {
    return this._milliseconds;
  }

  toSeconds(): number {
    return this._milliseconds / 1000;
  }

  toMinutes(): number {
    return this.toSeconds() / 60;
  }

  toHours(): number {
    return this.toMinutes() / 60;
  }

  toDays(): number {
    return this.toHours() / 24;
  }

  toDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this._milliseconds));
  }

  withAddedMilliseconds(ms: number): Duration {
    if (ms == null) {
      throw new Error("ms is required");
    }

    return new Duration(this._milliseconds + ms);
  }

  withAddedSeconds(seconds: number): Duration {
    if (seconds == null) {
      throw new Error("seconds is required");
    }

    return Duration.givenSeconds(this.toSeconds() + seconds);
  }

  withAddedMinutes(minutes: number): Duration {
    if (minutes == null) {
      throw new Error("minutes is required");
    }

    return Duration.givenMinutes(this.toMinutes() + minutes);
  }

  withAddedHours(hours: number): Duration {
    return Duration.givenHours(this.toHours() + hours);
  }

  withAddedDays(days: number): Duration {
    return Duration.givenDays(this.toDays() + days);
  }
}
