import { Duration } from "../Duration";
interface DebounceProps<T> {
    fn: (args: T) => void;
    duration: Duration;
}
export declare class Debounce<T = void> {
    private _timeout;
    private _lastArgs?;
    readonly props: DebounceProps<T>;
    constructor(props: DebounceProps<T>);
    invoke(args: T): void;
    clear(): void;
    private invokeNow;
}
export {};
