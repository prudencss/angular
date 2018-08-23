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
export interface CanAnimation {
  /** Theme animation palette for the component. */
  animation: AnimationPalette;
}

/** @docs-private */
export interface HasElementRef {
  _elementRef: ElementRef;
}

/** Possible animation palette values. */
export type AnimationPalette =
  | "ripple"
  | "reveal-opacity"
  | "reveal-slide"
  | undefined;

/** Mixin to augment a directive with a `animation` property. */
export function mixinAnimation<T extends Constructor<HasElementRef>>(
  base: T,
  defaultAnimation?: AnimationPalette
): Constructor<CanAnimation> & T {
  return class extends base {
    private _animation: AnimationPalette;

    get animation(): AnimationPalette {
      return this._animation;
    }
    set animation(value: AnimationPalette) {
      const animationPalette: AnimationPalette = value || defaultAnimation;

      if (animationPalette !== this._animation) {
        if (this._animation) {
          this._elementRef.nativeElement.classList.remove(
            `a-${this._animation}`
          );
        }
        if (animationPalette) {
          this._elementRef.nativeElement.classList.add(`a-${animationPalette}`);
        }

        this._animation = animationPalette;
      }
    }

    constructor(...args: any[]) {
      super(...args);

      // Set the default animation that can be specified from the mixin.
      this.animation = defaultAnimation;
    }
  };
}
