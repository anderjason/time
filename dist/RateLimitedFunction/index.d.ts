import { Duration } from "../Duration";
export declare type RateLimitedFunctionMode = "trailing" | "leading" | "both";
interface RateLimitedFunctionDefinition<T> {
    fn: (args?: T) => Promise<void>;
    duration: Duration;
    mode?: RateLimitedFunctionMode;
}
export declare class RateLimitedFunction<T> {
    static givenDefinition<T>(definition: RateLimitedFunctionDefinition<T>): RateLimitedFunction<T>;
    private _count;
    private _timeout;
    private _lastArgs?;
    private _fn;
    private _waitDuration;
    private _leading;
    private _trailing;
    private _isRunning;
    private _wasInvokedWhileRunning;
    private constructor();
    invoke(args?: T): void;
    clear(): void;
}
export {};
