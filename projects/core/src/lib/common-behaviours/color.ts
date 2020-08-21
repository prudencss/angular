import { ComponentBaseProps } from "../common-abstractions/component";

/** @docs-private */
export interface CanColor {
  /** Theme color palette for the component. */
  color?: ColorPalette;
}

export enum EColor {
  Primary = "primary",
  Secondary = "secondary",
  Accent = "accent",
  Success = "success",
  Info = "info",
  Warn = "warn",
  Danger = "danger",
  Disabled = "disabled"
}

/** Possible color palette values. */
export type ColorPalette = EColor | undefined;

/** Mixin to augment a directive with a `color` property. */
export abstract class Color extends ComponentBaseProps {
  private _color: ColorPalette;

  get color(): ColorPalette {
    return this._color;
  }
  set color(value: ColorPalette) {
    const colorPalette: ColorPalette = value || null;

    if (colorPalette !== this._color) {
      if (this._color) {
        this._classList.remove(`c-${this._componentInfix}--${this._color}`);
      }
      if (colorPalette) {
        this._classList.add(`c-${this._componentInfix}--${colorPalette}`);
      }

      this._color = colorPalette;
    }
  }
}
