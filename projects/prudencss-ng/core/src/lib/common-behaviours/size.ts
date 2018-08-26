import { ComponentBaseProps } from "../common-abstractions/component";

/** @docs-private */
export interface CanSize {
  /** Theme size palette for the component. */
  size: SizePalette;
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
export abstract class Size extends ComponentBaseProps {
  private _size: SizePalette;

  get size(): SizePalette {
    return this._size;
  }
  set size(value: SizePalette) {
    const sizePalette: SizePalette = value || null;

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
}
