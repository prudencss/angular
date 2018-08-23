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
  HostBinding,
  OnInit
} from "@angular/core";
import {
  ComponentBase,
  CanAnimation,
  CanColor,
  CanDecoration,
  CanDisable,
  CanSize,
  CanButtonType,
  mixinAnimation,
  mixinColor,
  mixinDecoration,
  mixinDisabled,
  mixinSize,
  mixinType
} from "@prudencss-ng/core";

/**
 * List of classes to add to MatButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  "label",
  "toggle",
  "layout", // button-group
  "reveal",
  "animated",
  "loading",
  "attached",
  "icon"
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
  extends mixinAnimation(
    mixinColor(
      mixinDecoration(mixinDisabled(mixinSize(mixinType(ComponentBase))))
    )
  )
  implements
    OnDestroy,
    OnInit,
    CanAnimation,
    CanColor,
    CanDecoration,
    CanDisable,
    CanSize,
    CanButtonType {
  @ViewChild(Spinner) spinner: Spinner;

  @Input() protected animation?: CanAnimation.animation;
  @Input() protected color?: CanColor.color;
  @Input() protected decoration?: CanDecoration.decoration;
  @Input()
  @HostBinding("attr.disabled")
  protected disabled?: boolean | string | null;
  @HostBinding("attr.aria-disabled")
  private ariaDisabled: string = this.disabled.toString();
  @Input() protected size?: CanSize.size;
  @Input()
  @HostBinding("attr.tabindex")
  protected tabindex: number = this.disabled ? -1 : 0;
  @Input() protected type?: CanButtonType.type;

  constructor(elementRef: ElementRef, private _focusMonitor: FocusMonitor) {
    super(elementRef);

    this._componentInfix = "btn";

    this._focusMonitor.monitor(this._getHostElement(), true);
  }

  ngOnInit() {
    if (
      this.type &&
      this.type.length &&
      this.type !== "basic" &&
      !(this.decoration && this.decoration.length)
    ) {
      this.decoration = "default";
    }
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._getHostElement());
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
