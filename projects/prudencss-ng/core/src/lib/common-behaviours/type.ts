import { ComponentBaseProps } from "../common-abstractions/component";

/** @docs-private */
export interface CanButtonType {
  /** Theme type palette for the button component. */
  type: ButtonTypePalette;
}

/** Possible type palette values. */
export type TypePalette = ButtonTypePalette;

/** Possible button type palette values. */
export type ButtonTypePalette =
  | "basic"
  | "stroked"
  | "flat"
  | "fab"
  | undefined;

/** Mixin to augment a directive with a `type` property. */
export abstract class Type extends ComponentBaseProps {
  private _type: TypePalette;

  get type(): TypePalette {
    return this._type;
  }
  set type(value: TypePalette) {
    const typePalette: TypePalette = value || null;

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
}
