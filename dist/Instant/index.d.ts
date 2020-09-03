import { Duration } from "../Duration";
export declare class Instant {
    static isEqual(a: Instant, b: Instant): boolean;
    static ofNow(): Instant;
    static givenEpochMilliseconds(epochMilliseconds: number): Instant;
    private _epochMilliseconds;
    private constructor();
    isEqual(other: Instant): boolean;
    toEpochMilliseconds(): number;
    toNativeDate(): Date;
    toString(): string;
    withAddedDuration(duration: Duration): Instant;
}
