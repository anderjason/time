import { Duration } from "../Duration";

interface ThrottleProps<T> {
  fn: (args: T) => void;
  duration: Duration;
}

export class Throttle<T = void> {
  private _timeout: any = null;
  private _isBlocked: boolean = false;

  readonly props: ThrottleProps<T>;

  constructor(props: ThrottleProps<T>) {
    this.props = props;
  }

  invoke(args: T): void {
    if (this._isBlocked) {
      return;
    }

    this._isBlocked = true;
    this._timeout = setTimeout(() => {
      this.clear();
    }, this.props.duration.toMilliseconds());

    this.props.fn(args);
  }

  clear(): void {
    this._isBlocked = false;

    if (this._timeout != null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}
