import { Duration, Instant } from "..";

interface StopwatchCategory {
  key: string;
  avgMs: number;
  totalMs: number;
  callCount: number;
}

class StopwatchInstance {
  readonly startedAt: Instant;
  readonly categoryKey: string;

  private _isRunning: boolean = true;
  private _onStop: (duration: Duration) => void;

  get isRunning(): boolean {
    return this._isRunning;
  }

  constructor(categoryKey: string, onStop: (duration: Duration) => void) {
    this.categoryKey = categoryKey;
    this.startedAt = Instant.ofNow();
    this._onStop = onStop;
  }

  stop(): void {
    if (this._isRunning == false) {
      return;
    }

    this._isRunning = false;

    const duration = Duration.givenInstantRange(this.startedAt, Instant.ofNow());
    this._onStop(duration);
  }
}


export class Stopwatch {
  readonly label: string;
  private _categoryByKey = new Map<string, StopwatchCategory>();

  private _instances = new Set<StopwatchInstance>();

  constructor(label: string) {
    this.label = label;
  }

  start(key: string): StopwatchInstance {
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

  getDuration(key: string): Duration {
    const category = this._categoryByKey.get(key);

    if (category == null) {
      throw new Error(`No category with key '${key}'`);
    }

    return Duration.givenMilliseconds(category.totalMs);
  }

  report(): void {
    if (this._instances.size > 0) {
      const keys = Array.from(this._instances).map(i => i.categoryKey);
      console.error(`${this.label} - Forcing ${this._instances.size} instances to stop (${keys.join(", ")})`);

      for (const instance of this._instances) {
        instance.stop();
      }
    }

    console.log("");
    console.log("---")
    console.log(this.label);

    let categories = Array.from(this._categoryByKey.values());
    categories.sort((a, b) => {
      const avgMsA = a.callCount == 0 ? 0 : a.totalMs / a.callCount;
      const avgMsB = b.callCount == 0 ? 0 : b.totalMs / b.callCount;

      // descending
      if (avgMsB > avgMsA) {
        return 1;
      } else if (avgMsB < avgMsA) {
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
    })
    console.log("---")
    console.log("")
  }
}
