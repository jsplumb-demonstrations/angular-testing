import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { jsPlumbToolkitModule } from "@jsplumbtoolkit/browser-ui-angular";

import { AppComponent } from './app.component';
import {NodeComponent} from "./node.component"

@NgModule({
  declarations: [
    AppComponent, NodeComponent
  ],
  imports: [
    BrowserModule, jsPlumbToolkitModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
