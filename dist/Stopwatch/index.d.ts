export declare class Stopwatch {
    readonly label: string;
    private _categoryByKey;
    constructor(label: string);
    start(key: string): void;
    stop(key: string): void;
    report(): void;
}
