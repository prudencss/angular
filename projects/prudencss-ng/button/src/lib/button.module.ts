import { NgModule } from "@angular/core";
import { PrueButtonComponent, PrueAnchorComponent } from "./button.component";

@NgModule({
  imports: [],
  declarations: [PrueButtonComponent, PrueAnchorComponent],
  exports: [PrueButtonComponent, PrueAnchorComponent]
})
export class ButtonModule {}
