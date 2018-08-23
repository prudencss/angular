import { ElementRef } from "@angular/core";

export abstract class ComponentBase {
  protected abstract _componentInfix: string;

  constructor(public _elementRef: ElementRef) {}
}
