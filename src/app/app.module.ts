import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PrudencssButtonComponent } from "@prudencss-ng/prudencss-button";

@NgModule({
  declarations: [AppComponent, PrudencssButtonComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
