/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Constructor } from "./constructor";
import { ElementRef } from "@angular/core";

/** @docs-private */
export interface CanButtonType {
  /** Theme type palette for the button component. */
  type: ButtonTypePalette;
}

/** @docs-private */
export interface HasElementRef {
  _elementRef: ElementRef;
}

/** Possible type palette values. */
export type TypePalette = ButtonTypePalette | undefined;

/** Possible button type palette values. */
export type ButtonTypePalette = "basic" | "stroked" | "flat" | "fab";

/** Mixin to augment a directive with a `type` property. */
export function mixinType<T extends Constructor<HasElementRef>>(
  base: T,
  defaultType?: TypePalette
): Constructor<CanType> & T {
  return class extends base {
    private _type: TypePalette;

    get type(): TypePalette {
      return this._type;
    }
    set type(value: TypePalette) {
      const typePalette: TypePalette = value || defaultType;

      if (typePalette !== this._type) {
        if (this._type) {
          this._elementRef.nativeElement.classList.remove(
            `c-${this._componentInfix}--${this._type}`
          );
        }
        if (typePalette) {
          this._elementRef.nativeElement.classList.add(
            `c-${this._componentInfix}--${typePalette}`
          );
        }

        this._type = typePalette;
      }
    }

    constructor(...args: any[]) {
      super(...args);

      // Set the default type that can be specified from the mixin.
      this.type = defaultType;
    }
  };
}
