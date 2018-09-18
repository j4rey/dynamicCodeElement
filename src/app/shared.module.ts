import { CommonModule } from '@angular/common';
import { SanitizeHtml } from './sanitize.pipe';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
      SanitizeHtml
    ],
    imports: [
      CommonModule
    ],
    exports:[CommonModule,SanitizeHtml]
  })
  export class SharedModule { 
    
  }