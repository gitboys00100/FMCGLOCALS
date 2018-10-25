import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaySorterPipe } from './daySorter.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ DaySorterPipe ],
  exports: [ DaySorterPipe ]
})
export class DaySorterPipeModule { }
