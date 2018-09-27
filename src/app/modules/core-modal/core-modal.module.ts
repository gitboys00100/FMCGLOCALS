import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModalComponent } from './core-modal.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CoreModalComponent, ModalComponent],
  exports: [
    ModalComponent
  ]
})
export class CoreModalModule { }
