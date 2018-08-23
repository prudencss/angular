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
export interface CanSize {
  /** Theme size palette for the component. */
  size: SizePalette;
}

/** @docs-private */
export interface HasElementRef {
  _elementRef: ElementRef;
}

/** Possible size palette values. */
export type SizePalette =
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "huge"
  | undefined;

/** Mixin to augment a directive with a `size` property. */
export function mixinSize<T extends Constructor<HasElementRef>>(
  base: T,
  defaultSize?: SizePalette
): Constructor<CanSize> & T {
  return class extends base {
    private _size: SizePalette;

    get size(): SizePalette {
      return this._size;
    }
    set size(value: SizePalette) {
      const sizePalette: SizePalette = value || defaultSize;

      if (sizePalette !== this._size) {
        if (this._size) {
          this._elementRef.nativeElement.classList.remove(
            `c-${this._componentInfix}--${this._size}`
          );
        }
        if (sizePalette) {
          this._elementRef.nativeElement.classList.add(
            `c-${this._componentInfix}--${sizePalette}`
          );
        }

        this._size = sizePalette;
      }
    }

    constructor(...args: any[]) {
      super(...args);

      // Set the default size that can be specified from the mixin.
      this.size = defaultSize;
    }
  };
}
