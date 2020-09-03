import { Duration } from "../Duration";

export type RateLimitedFunctionMode = "trailing" | "leading" | "both";

interface RateLimitedFunctionDefinition<T> {
  fn: (args?: T) => Promise<void>;
  duration: Duration;

  mode?: RateLimitedFunctionMode;
}

export class RateLimitedFunction<T> {
  static givenDefinition<T>(
    definition: RateLimitedFunctionDefinition<T>
  ): RateLimitedFunction<T> {
    return new RateLimitedFunction(definition);
  }

  private _count: number = 0;
  private _timeout: any = null;
  private _lastArgs?: T;
  private _fn: (args?: T) => Promise<void>;
  private _waitDuration: Duration;
  private _leading: boolean;
  private _trailing: boolean;
  private _isRunning: boolean;
  private _wasInvokedWhileRunning: boolean;

  private constructor(definition: RateLimitedFunctionDefinition<T>) {
    const mode = definition.mode || "trailing";

    this._fn = definition.fn;
    this._waitDuration = definition.duration;
    this._leading = mode === "leading" || mode === "both";
    this._trailing = mode === "trailing" || mode === "both";
    this._isRunning = false;
    this._wasInvokedWhileRunning = false;
  }

  invoke(args?: T): void {
    this._count += 1;
    this._lastArgs = args;

    if (this._isRunning) {
      this._wasInvokedWhileRunning = true;
      return;
    }

    const invokeNow = () => {
      this._isRunning = true;
      this._lastArgs = undefined;

      const onFinishedRunning = () => {
        const wasInvoked = this._wasInvokedWhileRunning;

        this._count = 0;
        this._isRunning = false;
        this._wasInvokedWhileRunning = false;

        if (wasInvoked) {
          this.invoke(this._lastArgs);
        }
      };

      try {
        this._fn(args)
          .then(() => {
            onFinishedRunning();
          })
          .catch((err) => {
            console.error(err);
            onFinishedRunning();
          });
      } catch (err) {
        console.error(err);
        onFinishedRunning();
      }
    };

    if (this._count === 1 && this._leading) {
      invokeNow();
    }

    const finishedWaiting = () => {
      if (this._trailing) {
        if (!this._leading || this._count > 1) {
          invokeNow();
          return;
        }
      }

      this._count = 0;
    };

    if (this._timeout != null) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(
      finishedWaiting,
      this._waitDuration.toMilliseconds()
    );
  }

  clear(): void {
    if (this._timeout != null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}
