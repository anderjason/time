"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debounce = void 0;
class Debounce {
    constructor(props) {
        this._timeout = null;
        this.props = props;
    }
    invoke(args) {
        this._lastArgs = args;
        if (this._timeout != null) {
            clearTimeout(this._timeout);
        }
        this._timeout = setTimeout(() => {
            this.invokeNow();
        }, this.props.duration.toMilliseconds());
    }
    clear() {
        this._lastArgs = undefined;
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }
    invokeNow() {
        const args = this._lastArgs;
        this.clear();
        this.props.fn(args);
    }
}
exports.Debounce = Debounce;
//# sourceMappingURL=index.js.map