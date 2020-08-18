import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { ComponentBaseProps } from '../common-abstractions/component';

/** @docs-private */
export interface CanDisable {
  /** Whether the component is disabled. */
  disabled?: DisabledPalette;
}

export type DisabledPalette = boolean | string | null | undefined;

/** Mixin to augment a directive with a `disabled` property. */
export abstract class Disabled extends ComponentBaseProps {
  private _disabled: boolean;
  private _disabledClass: string;

  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    const _disabled = coerceBooleanProperty(value || null);
    const _disabledClass: string = typeof value === 'string' ? value : '';
    const _disabledClassCompanion: string = 'u-pointer--disabled';

    if (_disabled !== this._disabled) {
      if (this._disabledClass && this._disabledClass.length > 0) {
        this._elementRef.nativeElement.classList.remove(this._disabledClass);
      }
      if (_disabled) {
        this._elementRef.nativeElement.classList.add(_disabledClassCompanion);
        if (_disabledClass.length > 0) {
          this._elementRef.nativeElement.classList.add(_disabledClass);
        }
      } else {
        this._elementRef.nativeElement.classList.remove(
          _disabledClassCompanion
        );
      }
    }

    this._disabled = _disabled;
    this._disabledClass = _disabledClass;
  }
}
