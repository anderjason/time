import { Duration } from "../Duration";

interface DebounceProps<T> {
  fn: (args: T) => void;
  duration: Duration;
}

export class Debounce<T = void> {
  private _timeout: any = null;
  private _lastArgs?: T;

  readonly props: DebounceProps<T>;

  constructor(props: DebounceProps<T>) {
    this.props = props;
  }

  invoke(args: T): void {
    this._lastArgs = args;

    if (this._timeout != null) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this.invokeNow();
    }, this.props.duration.toMilliseconds());
  }

  clear(): void {
    this._lastArgs = undefined;
    if (this._timeout != null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }

  private invokeNow(): void {
    const args = this._lastArgs;

    this.clear();
    this.props.fn(args);
  }
}
