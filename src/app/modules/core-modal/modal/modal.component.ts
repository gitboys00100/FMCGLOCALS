import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ContentChild('modalHeader') header: TemplateRef<any>;
  @ContentChild('modalBody') body: TemplateRef<any>;
  @ContentChild('modalFooter') footer: TemplateRef<any>;
  @Input() closeBtnInside: boolean = true;
  @Input() isOpen = false;
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onModalOpen() {
    this.isOpen = true;
  }

  onModalClose() {
    this.isOpen = false;
    this.modalClosed.next(false);
  }
}
