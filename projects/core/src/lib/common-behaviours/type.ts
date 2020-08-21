import { ComponentBaseProps } from "../common-abstractions/component";

export interface CanType<ComponentTypePalette> {
  type?: ComponentTypePalette;
}

/** Mixin to augment a directive with a `type` property. */
export abstract class Type<ComponentTypePalette> extends ComponentBaseProps {
  private _type: ComponentTypePalette;

  get type(): ComponentTypePalette {
    return this._type;
  }
  set type(value: ComponentTypePalette) {
    const typePalette: ComponentTypePalette = value || null;

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
