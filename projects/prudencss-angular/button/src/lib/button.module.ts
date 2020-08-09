import { NgModule } from "@angular/core";
import { PrudencssButtonComponent, PrudencssAnchorComponent } from "./button.component";

@NgModule({
  imports: [],
  declarations: [PrudencssButtonComponent, PrudencssAnchorComponent],
  exports: [PrudencssButtonComponent, PrudencssAnchorComponent]
})
export class ButtonModule {}
