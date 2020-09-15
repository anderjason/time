import { Duration } from "../Duration";
interface ThrottleProps<T> {
    fn: (args: T) => void;
    duration: Duration;
}
export declare class Throttle<T = void> {
    private _timeout;
    private _isBlocked;
    readonly props: ThrottleProps<T>;
    constructor(props: ThrottleProps<T>);
    invoke(args: T): void;
    clear(): void;
}
export {};
