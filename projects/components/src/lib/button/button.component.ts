import { FocusMonitor } from '@angular/cdk/a11y';
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
  OnInit,
} from '@angular/core';
import {
  ICtor,
  ComponentBase,
  CanAnimation,
  CanColor,
  CanDecoration,
  CanDisable,
  CanSize,
  CanButtonType,
  Animation,
  AnimationPalette,
  Color,
  ColorPalette,
  Decoration,
  DecorationPalette,
  Disabled,
  DisabledPalette,
  Size,
  SizePalette,
  Type,
  ButtonTypePalette,
} from 'core';

/**
 * List of classes to add to MatButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  'label',
  'toggle',
  'layout', // button-group
  'reveal',
  'animated',
  'loading',
  'attached',
  'icon',
];

@Component({
  selector: `button[Prudencss-button]`,
  exportAs: 'PrudencssButton',
  templateUrl: 'button.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrudencssButtonComponent
  extends ComponentBase.mixin(
    Animation,
    Color,
    Decoration,
    Disabled,
    Size,
    Type
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
  // @ViewChild(Spinner) spinner: Spinner;

  @Input() animation?: AnimationPalette;
  @Input() color?: ColorPalette;
  @Input() decoration?: DecorationPalette;
  @Input()
  @HostBinding('attr.disabled')
  disabled?: DisabledPalette;
  @HostBinding('attr.aria-disabled')
  ariaDisabled: string | null = this.disabled ? this.disabled.toString() : null;
  @Input() size?: SizePalette;
  @Input()
  @HostBinding('attr.tabindex')
  tabindex: number = this.disabled ? -1 : 0;
  @Input() type?: ButtonTypePalette;

  constructor(elementRef: ElementRef, private _focusMonitor: FocusMonitor) {
    super(elementRef);

    this._componentInfix = 'btn';
    super._init();

    this._focusMonitor.monitor(this.getHostElement(), true);
  }

  ngOnInit() {
    if (
      this.type &&
      this.type.length &&
      this.type !== 'basic' &&
      !(this.decoration && this.decoration.length)
    ) {
      this.decoration = 'default';
    }
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this.getHostElement());
  }

  /** Focuses the button. */
  focus(): void {
    this.getHostElement().focus();
  }
}

/**
 * Raised Material design button.
 */
@Component({
  selector: `a[Prudencss-button]`,
  exportAs: 'PrudencssAnchor',
  templateUrl: 'button.html',
  styleUrls: ['button.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrudencssAnchorComponent extends PrudencssButtonComponent {
  @HostListener('click', ['$event.target'])
  haltDisabledEvents(originalClickElement: HTMLElement) {
    // A disabled button shouldn't apply any actions
    if (this.disabled || originalClickElement !== this.getHostElement()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
