import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrudencssButtonComponent } from './prudencss-button.component';

describe('PrudencssButtonComponent', () => {
  let component: PrudencssButtonComponent;
  let fixture: ComponentFixture<PrudencssButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrudencssButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrudencssButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
