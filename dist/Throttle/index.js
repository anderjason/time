"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throttle = void 0;
class Throttle {
    constructor(props) {
        this._timeout = null;
        this._isBlocked = false;
        this.props = props;
    }
    invoke(args) {
        if (this._isBlocked) {
            return;
        }
        this._isBlocked = true;
        this._timeout = setTimeout(() => {
            this.clear();
        }, this.props.duration.toMilliseconds());
        this.props.fn(args);
    }
    clear() {
        this._isBlocked = false;
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }
}
exports.Throttle = Throttle;
//# sourceMappingURL=index.js.map