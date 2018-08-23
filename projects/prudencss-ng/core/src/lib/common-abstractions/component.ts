import { ElementRef } from "@angular/core";

export abstract class ComponentBase {
  protected readonly _componentInfix: string;

  constructor(public _elementRef: ElementRef) {
    this._getHostElement().classList.add(`c-${this._componentInfix}`);
  }

  protected _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  protected _hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some(attribute =>
      this._getHostElement().hasAttribute(attribute)
    );
  }
}
