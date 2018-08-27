import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrueButtonComponent } from "./button.component";

describe("PrueButtonComponent", () => {
  let component: PrueButtonComponent;
  let fixture: ComponentFixture<PrueButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrueButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrueButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
