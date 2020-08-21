import { ComponentBaseProps } from "../common-abstractions/component";

/** @docs-private */
export interface CanAnimation {
  /** Theme animation palette for the component. */
  animation?: AnimationPalette;
}

export enum EAnimation {
  Jiggle = "jiggle",
  Ripple = "ripple",
  RevealOpacity = "reveal-opacity",
  RevealSlide = "reveal-slide",
  Tata = "tata"
}

/** Possible animation palette values. */
export type AnimationPalette = EAnimation | undefined;

/** Mixin to augment a directive with an `animation` property. */
export abstract class Animation extends ComponentBaseProps {
  private _animation: AnimationPalette;

  get animation(): AnimationPalette {
    return this._animation;
  }
  set animation(value: AnimationPalette) {
    const animationPalette: AnimationPalette = value || null;

    if (animationPalette !== this._animation) {
      if (this._animation) {
        this._elementRef.nativeElement.classList.remove(`a-${this._animation}`);
      }
      if (animationPalette) {
        this._elementRef.nativeElement.classList.add(`a-${animationPalette}`);
      }

      this._animation = animationPalette;
    }
  }
}
