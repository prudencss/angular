import { coerceBooleanProperty } from "@angular/cdk/coercion";

import { ComponentBaseProps } from "../common-abstractions/component";

/** @docs-private */
export interface CanDisable {
  /** Whether the component is disabled. */
  disabled: boolean;
}

/** Mixin to augment a directive with a `disabled` property. */
export abstract class Disabled extends ComponentBaseProps {
  private _disabled: boolean = false;
  private _disabledClass: string = "";

  protected readonly _disabledClassCompanion: string = "u-pointer--disabled";

  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    const _disabled = coerceBooleanProperty(value);
    const _disabledClass: string = typeof value === "string" ? value : "";

    if (!_disabled !== this._disabled) {
      if (this._disabledClass.length > 0) {
        this._elementRef.nativeElement.classList.remove(this._disabledClass);
      }
      if (_disabled) {
        this._elementRef.nativeElement.classList.add(
          this._disabledClassCompanion
        );
        if (_disabledClass.length > 0) {
          this._elementRef.nativeElement.classList.add(_disabledClass);
        }
      } else {
        this._elementRef.nativeElement.classList.remove(
          this._disabledClassCompanion
        );
      }
    }

    this._disabled = _disabled;
    this._disabledClass = _disabledClass;
  }
}
