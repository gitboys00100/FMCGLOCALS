import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './orderBy.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ OrderByPipe ],
  exports: [ OrderByPipe ]
})
export class OrderByPipeModule { }
