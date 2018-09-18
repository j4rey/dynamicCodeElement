import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, Compiler } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements'
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './app.service';
import { BppComponent } from './bpp/bpp.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [DataService
  ],
  entryComponents: [AppComponent],
  bootstrap: [BppComponent]
})
export class AppModule { 
  constructor(private injector: Injector){
    customElements.define(
      'code-element',
      createCustomElement(AppComponent,{injector})
    )
  }

  ngDoBootstrap(){

  }
}
