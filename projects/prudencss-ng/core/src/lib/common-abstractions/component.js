"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ComponentBaseProps = /** @class */ (function () {
    function ComponentBaseProps() {
    }
    return ComponentBaseProps;
}());
exports.ComponentBaseProps = ComponentBaseProps;
var ComponentBase = /** @class */ (function (_super) {
    __extends(ComponentBase, _super);
    function ComponentBase(_elementRef) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._classList = _this._elementRef.nativeElement.classList;
        _this.getHostElement().classList.add("c-" + _this._componentInfix);
        return _this;
    }
    ComponentBase.mixin = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Augmented = /** @class */ (function (_super) {
            __extends(Augmented, _super);
            function Augmented() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Augmented;
        }(ComponentBase));
        args.forEach(function (mixin) {
            for (var _i = 0, _a = Object.keys(mixin.prototype); _i < _a.length; _i++) {
                var method = _a[_i];
                var descriptor = Object.getOwnPropertyDescriptor(mixin.prototype, method);
                Object.defineProperty(Augmented.prototype, method, descriptor);
            }
        });
        return Augmented;
    };
    ComponentBase.prototype._hasHostAttributes = function () {
        var _this = this;
        var attributes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            attributes[_i] = arguments[_i];
        }
        return attributes.some(function (attribute) {
            return _this.getHostElement().hasAttribute(attribute);
        });
    };
    ComponentBase.prototype.getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    return ComponentBase;
}(ComponentBaseProps));
exports.ComponentBase = ComponentBase;
