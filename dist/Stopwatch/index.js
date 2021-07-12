"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
class Stopwatch {
    constructor(label) {
        this._categoryByKey = new Map();
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
        if (category.startedAt != null) {
            throw new Error(`Category '${key}' is already running`);
        }
        category.startedAt = performance.now();
    }
    stop(key) {
        let category = this._categoryByKey.get(key);
        if (category == null || category.startedAt == null) {
            throw new Error(`Category '${key}' is not running`);
        }
        const durationMs = performance.now() - category.startedAt;
        category.startedAt = undefined;
        if (category.callCount > 0) {
            category.avgMs =
                category.avgMs + (durationMs - category.avgMs) / category.callCount;
        }
        category.callCount += 1;
    }
    report() {
        console.log("");
        console.log("---");
        console.log(this.label);
        let categories = Array.from(this._categoryByKey.values());
        categories.sort((a, b) => {
            if (a.avgMs > b.avgMs) {
                return 1;
            }
            else if (a.avgMs < b.avgMs) {
                return -1;
            }
            return 0;
        });
        categories.forEach(category => {
            const id = category.key.padStart(30);
            const totalMs = String(`${Math.round(category.totalMs)}ms total`).padStart(20);
            const count = category.callCount;
            const avgMs = String(`${Math.round(category.avgMs)} ms avg`).padStart(20);
            const times = `${count} times`.padStart(20);
            console.log(`${id} ${times} ${avgMs} ${totalMs}`);
        });
        console.log("---");
        console.log("");
    }
}
exports.Stopwatch = Stopwatch;
//# sourceMappingURL=index.js.map