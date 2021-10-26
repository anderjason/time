"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
const __1 = require("..");
class StopwatchInstance {
    constructor(categoryKey, onStop) {
        this._isRunning = true;
        this.categoryKey = categoryKey;
        this.startedAt = __1.Instant.ofNow();
        this._onStop = onStop;
    }
    get isRunning() {
        return this._isRunning;
    }
    stop() {
        if (this._isRunning == false) {
            return;
        }
        this._isRunning = false;
        const duration = __1.Duration.givenInstantRange(this.startedAt, __1.Instant.ofNow());
        this._onStop(duration);
    }
}
class Stopwatch {
    constructor(label) {
        this._categoryByKey = new Map();
        this._instances = new Set();
        this.label = label;
    }
    start(key) {
        let category = this._categoryByKey.get(key);
        if (category == null) {
            category = {
                key,
                avgMs: 0,
                totalMs: 0,
                callCount: 0,
            };
            this._categoryByKey.set(key, category);
        }
        const instance = new StopwatchInstance(key, duration => {
            category.callCount += 1;
            category.totalMs += duration.toMilliseconds();
            category.avgMs = category.totalMs / category.callCount;
            this._instances.delete(instance);
        });
        this._instances.add(instance);
        return instance;
    }
    getDuration(key) {
        const category = this._categoryByKey.get(key);
        if (category == null) {
            throw new Error(`No category with key '${key}'`);
        }
        return __1.Duration.givenMilliseconds(category.totalMs);
    }
    report() {
        if (this._instances.size > 0) {
            const keys = Array.from(this._instances).map(i => i.categoryKey);
            console.error(`${this.label} - Forcing ${this._instances.size} instances to stop (${keys.join(", ")})`);
            for (const instance of this._instances) {
                instance.stop();
            }
        }
        console.log("");
        console.log("---");
        console.log(this.label);
        let categories = Array.from(this._categoryByKey.values());
        categories.sort((a, b) => {
            const avgMsA = a.callCount == 0 ? 0 : a.totalMs / a.callCount;
            const avgMsB = b.callCount == 0 ? 0 : b.totalMs / b.callCount;
            // descending
            if (avgMsB > avgMsA) {
                return 1;
            }
            else if (avgMsB < avgMsA) {
                return -1;
            }
            return 0;
        });
        categories.forEach(category => {
            const id = category.key.padStart(30);
            const total = String(`${Math.round(category.totalMs)}ms total`).padStart(20);
            const count = category.callCount;
            const avgMs = category.callCount == 0 ? 0 : category.totalMs / category.callCount;
            const avg = String(`${Math.round(avgMs)}ms avg`).padStart(20);
            const times = `${count} times`.padStart(20);
            console.log(`${id} ${times} ${avg} ${total}`);
        });
        console.log("---");
        console.log("");
    }
}
exports.Stopwatch = Stopwatch;
//# sourceMappingURL=index.js.map