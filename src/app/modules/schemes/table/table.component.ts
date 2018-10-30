import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-promotiondiscount',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class SchemeTableComponent implements OnInit {
  @ViewChild('addDialog') addDialog: ModalComponent;
  @ViewChild('deleteDialog') deleteDialog: ModalComponent;
  @ViewChild('editDialog') editDialog: ModalComponent;

public itemsPerPage: number = 5;
public arrRetailers2: Array<{}> = [];

public addForm = this.fb.group({
    a_name: ['', Validators.required],
    a_type: ['', Validators.required],
    a_discount: ['', Validators.required],
    a_description: ['', Validators.required],
    a_item: ['', Validators.required],
    a_start: ['', Validators.required],
    a_end: ['', Validators.required],
  });

public editForm = this.fb.group({
    e_name: ['', Validators.required],
    e_type: ['', Validators.required],
    e_discount: ['', Validators.required],
    e_description: ['', Validators.required],
  });

  d_id: number = 0;
  d_name: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {


/*
    this.arrRetailers2 = [
      {
      "status": "2001",
      "message":"Success",
      "data": [
        {
          "name": "Scheme1",
          "type": "type1",
          "discount": "2%",
          "description": "Description"
        },
        {
          "name": "Scheme2",
          "type": "type1",
          "discount": "2%",
          "description": "Description"
        },
        {
          "name": "Scheme3",
          "type": "type1",
          "discount": "3%",
          "description": "Description"
        },
        {
          "name": "Scheme4",
          "type": "type1",
          "discount": "2%",
          "description": "Description"
        },
        {
          "name": "Scheme5",
          "type": "type1",
          "discount": "3%",
          "description": "Description"
        },
        {
          "name": "Scheme6",
          "type": "type1",
          "discount": "2%",
          "description": "Description"
        },
        {
          "name": "Scheme7",
          "type": "type1",
          "discount": "2%",
          "description": "Description"
        },
        {
          "name": "Scheme8",
          "type": "type1",
          "discount": "2%",
          "description": "Description"
        },
        {
          "name": "Scheme9",
          "type": "type1",
          "discount": "2%",
          "description": "Description"
        }
      ],
      "pagination": {
          "offset": 20,
          "limit": 10,
          "total": 1
        }
      }
    ];
*/

  this.getDiscounts();


  }

  getDiscounts() {
    this.apiService.get('discounts/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      console.log(data);
      this.arrRetailers2 = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }


    onAdd() {
      this.addDialog.onModalOpen();
    }

    onAddSubmitModal() {
      //alert(this.id);
      this.addDialog.onModalClose();
    }

    closeAddModal() {
      this.addDialog.onModalClose();
    }


    openEditModal(e) {
      this.editForm.get('e_name').setValue(e.name);
      this.editForm.get('e_type').setValue(e.type);
      this.editForm.get('e_discount').setValue(e.discount);
      this.editForm.get('e_description').setValue(e.description);

      this.editDialog.onModalOpen();
    }

    onEditSubmitModal() {
      //alert(this.id);
      this.editDialog.onModalClose();
    }

    closeEditModal() {
      this.editDialog.onModalClose();
    }


    openDeleteModal(e) {
      this.d_id = e.id;
      this.d_name = e.name;
      this.deleteDialog.onModalOpen();
    }

    onDeleteSubmitModal() {
      //alert(this.id);
      this.deleteDialog.onModalClose();
    }

    closeDeleteModal() {
      this.deleteDialog.onModalClose();
    }




    public onShowCountChange($event) {
      this.itemsPerPage = $event.target.value;
    }










}
