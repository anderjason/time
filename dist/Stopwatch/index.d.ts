import { Duration, Instant } from "..";
declare class StopwatchInstance {
    readonly startedAt: Instant;
    readonly categoryKey: string;
    private _isRunning;
    private _onStop;
    get isRunning(): boolean;
    constructor(categoryKey: string, onStop: (duration: Duration) => void);
    stop(): void;
}
export declare class Stopwatch {
    readonly label: string;
    private _categoryByKey;
    private _instances;
    constructor(label: string);
    start(key: string): StopwatchInstance;
    getDuration(key: string): Duration;
    report(): void;
}
export {};
