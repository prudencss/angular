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
export interface CanDecoration {
  /** Theme decoration palette for the component. */
  decoration: DecorationPalette;
}

/** @docs-private */
export interface HasElementRef {
  _elementRef: ElementRef;
}

/** Possible decoration palette values. */
export type DecorationPalette =
  | "discrete"
  | "elevated"
  | "elevated-bottom"
  | "sunken"
  | undefined;

/** Mixin to augment a directive with a `decoration` property. */
export function mixinDecoration<T extends Constructor<HasElementRef>>(
  base: T,
  defaultDecoration?: DecorationPalette
): Constructor<CanDecoration> & T {
  return class extends base {
    private _decoration: DecorationPalette;

    get decoration(): DecorationPalette {
      return this._decoration;
    }
    set decoration(value: DecorationPalette) {
      const decorationPalette: DecorationPalette = value || defaultDecoration;

      if (decorationPalette !== this._decoration) {
        if (this._decoration) {
          this._elementRef.nativeElement.classList.remove(
            `u-shadow---${this._decoration}`
          );
        }
        if (decorationPalette) {
          this._elementRef.nativeElement.classList.add(
            `u-shadow--${decorationPalette}`
          );
        }

        this._decoration = decorationPalette;
      }
    }

    constructor(...args: any[]) {
      super(...args);

      // Set the default decoration that can be specified from the mixin.
      this.decoration = defaultDecoration;
    }
  };
}
