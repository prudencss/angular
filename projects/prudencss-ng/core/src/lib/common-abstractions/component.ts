import { ElementRef } from "@angular/core";

type ICtor<T> = new (...args: any[]) => T;

export abstract class ComponentBaseProps {
  protected _componentInfix: string;
  protected _classList: DOMTokenList;
  protected _elementRef: ElementRef;
}

export abstract class ComponentBase extends ComponentBaseProps {
  constructor(protected _elementRef: ElementRef) {
    super();
    this._classList = this._elementRef.nativeElement.classList;
    this.getHostElement().classList.add(`c-${this._componentInfix}`);
  }

  static mixin<(...args: any[]): ICtor<ComponentBase> {
    class Augmented extends ComponentBase {}
    args.forEach(mixin => {
      for (const method of Object.keys(mixin.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(
          mixin.prototype,
          method
        );
        Object.defineProperty(Augmented.prototype, method, descriptor);
      }
    });
    return Augmented;
  }

  protected _hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some(attribute =>
      this.getHostElement().hasAttribute(attribute)
    );
  }

  public getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
