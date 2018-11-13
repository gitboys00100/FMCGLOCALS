import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSpecificPipe } from './select-specific.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ SelectSpecificPipe ],
  exports: [ SelectSpecificPipe ]
})
export class SelectSpecificPipeModule { }
