/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { FocusMonitor } from "@angular/cdk/a11y";
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  Optional,
  Inject,
  Input,
  ElementRef,
  HostListener,
  HostBinding
} from "@angular/core";
import {
  ComponentBase,
  CanAnimation,
  CanColor,
  CanDisable,
  CanButtonType,
  mixinAnimation,
  mixinColor,
  mixinDisabled,
  mixinType
} from "@prudencss-ng/core";

/**
 * List of classes to add to MatButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  "type",
  "size",
  "color",
  "animation",
  "label",
  "toggle",
  "layout",
  "reveal",
  "animated",
  "loading",
  "attached",
  "icon",
  "decoration"
];

/**
 * Material design button.
 */
@Component({
  moduleId: module.id,
  selector: `button[prue-button]`,
  exportAs: "prueButton",
  templateUrl: "button.html",
  styleUrls: ["button.css"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrueButtonComponent
  extends mixinAnimation(mixinColor(mixinDisabled(mixinType(ComponentBase))))
  implements OnDestroy, CanDisable, CanColor, CanButtonType, CanAnimation {
  protected readonly _componentInfix: string = "btn";

  @ViewChild(Spinner) spinner: Spinner;

  @Input()
  @HostBinding("attr.disabled")
  protected disabled?: boolean | string | null;
  @HostBinding("attr.aria-disabled")
  private ariaDisabled: string = this.disabled.toString();
  @Input()
  @HostBinding("attr.tabindex")
  protected tabindex: number = this.disabled ? -1 : 0;
  @Input() protected color?: CanColor.color;
  @Input() protected animation?: CanAnimation.animation;
  @Input() protected type?: CanButtonType.type;

  constructor(elementRef: ElementRef, private _focusMonitor: FocusMonitor) {
    super(elementRef);

    // For each of the variant selectors that is prevent in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        this._getHostElement().classList.add(attr);
      }
    }

    this._focusMonitor.monitor(this._getHostElement(), true);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._getHostElement());
  }

  protected _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /** Gets whether the button has one of the given attributes. */
  protected _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }
}

/**
 * Raised Material design button.
 */
@Component({
  moduleId: module.id,
  selector: `a[prue-button]`,
  exportAs: "prueAnchor",
  templateUrl: "button.html",
  styleUrls: ["button.css"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrueAnchorComponent extends PrueButtonComponent {
  @HostListener("click", ["$event.target"])
  protected _haltDisabledEvents(originalClickElement: HTMLElement) {
    // A disabled button shouldn't apply any actions
    if (this.disabled || originalClickElement !== this._getHostElement()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
