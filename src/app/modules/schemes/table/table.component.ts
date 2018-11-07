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

  loading: boolean;

public itemsPerPage: number = 5;
public arrRetailers2: Array<{}> = [];

public addForm = this.fb.group({
    a_name: ['', Validators.required],
    a_type: ['', Validators.required],
    a_discount: ['', Validators.required],
    a_description: ['', Validators.required],
    a_item: [],
    a_start: ['', Validators.required],
    a_end: ['', Validators.required],
  });

public editForm = this.fb.group({
    e_name: ['', Validators.required],
    e_description: ['', Validators.required],
    e_type: ['', Validators.required],
    e_discount: ['', Validators.required],
    e_item: [],
    e_start: ['', Validators.required],
    e_end: ['', Validators.required],
  });

  e_id: number = 0;

  d_id: number = 0;
  d_name: string = '';

  items: any[];
  type: string = 'Amount/Percent';
  type2: string = 'Amount/Percent';

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
  this.getItemsFromApi();

  }

  getDiscounts() {
    this.loading = true;
    this.apiService.get('discounts/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      this.loading = false;
      this.arrRetailers2 = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }

  getItemsFromApi() {
    this.apiService.get('items/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      this.items = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }


    onAdd() {
      this.addDialog.onModalOpen();
    }

    onSubmitAdd() {



      let userdata = {};
          userdata['timestamp'] = new Date();
          userdata['name'] = this.addForm.get('a_name').value;
          userdata['description'] = this.addForm.get('a_description').value;
          userdata['item'] = this.addForm.get('a_item').value;
          userdata['start_date'] = new Date(this.addForm.get('a_start').value);
          userdata['end_date'] = new Date(this.addForm.get('a_end').value);

          if(this.type == 'Percent'){
            userdata['percentage'] = this.addForm.get('a_discount').value;
          }
          else{
            userdata['value'] = this.addForm.get('a_discount').value;
          }

      let user_json_string = userdata;
      console.log(user_json_string);

  this.apiService.post('discounts/',user_json_string).subscribe(ret => {
    let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
    alert("Add Discount Successful!");
    this.getDiscounts();
    //location.reload();
    },
    (err) => {
      console.log(err);
    }
  );





      this.addDialog.onModalClose();
    }

    closeAddModal() {
      this.addForm.reset();
      this.addDialog.onModalClose();
    }


    openEditModal(e) {
      this.e_id = e.id;

      this.editForm.get('e_name').setValue(e.name);
      this.editForm.get('e_description').setValue(e.description);
      this.editForm.get('e_start').setValue(e.start_date.substring(0,10));
      this.editForm.get('e_end').setValue(e.end_date.substring(0,10));

      if(e.value == null){
        this.editForm.get('e_type').setValue('Percent');
        this.editForm.get('e_discount').setValue(e.percentage);
      }
      else{
        this.editForm.get('e_type').setValue('Amount');
        this.editForm.get('e_discount').setValue(e.value);
      }

      if(e.item_id){
        this.editForm.get('e_item').setValue(e.item_id);
      }

      this.editDialog.onModalOpen();
    }

    onEditSubmit() {
      //alert(this.id);
      let retdata = {};
          retdata['name'] = this.editForm.get('e_name').value;
          retdata['description'] = this.editForm.get('e_description').value;
          retdata['start_date'] = this.editForm.get('e_start').value+' 00:00:00';
          retdata['end_date'] = this.editForm.get('e_end').value+' 00:00:00';

          retdata['item'] = this.editForm.get('e_item').value;

          if(this.type2 == 'Percent'){
            retdata['percentage'] = this.editForm.get('e_discount').value;
          }
          else{
            retdata['value'] = this.editForm.get('e_discount').value;
          }

      let user_json_string = retdata;

      console.log(user_json_string);
      //alert(this.id);
      this.apiService.patch('discounts/'+this.e_id+'/', user_json_string)
      .subscribe((response) => {
        if(response['code'] == 2004 && response['message'] == 'Entry updated') {
          alert('Discount has been successfully updated');
          this.getDiscounts();
        }
        else {
          alert(response['code']+':'+response['message']);
        }
      });




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
      this.apiService.delete('discounts/'+this.d_id+'/')
      .subscribe((response) => {
        if(response['code'] == 2005 && response['message'] == 'Entry deleted') {
          alert('Delete Successful!');
          //window.location.reload();
          this.getDiscounts();
        }
        else {
          alert(response['code']+':'+response['message']);
        }
      });
      this.deleteDialog.onModalClose();
    }

    closeDeleteModal() {
      this.deleteDialog.onModalClose();
    }




    public onShowCountChange($event) {
      this.itemsPerPage = $event.target.value;
    }


clickType(value){
  this.type = value;
}

clickType2(value){
  this.type2 = value;
}


convertToNegative() {
  var input = <HTMLInputElement>document.getElementById('a_discount');
  var number = input.value;
  if(!isNaN(parseInt(number))) {
    var numberInString = number.toLocaleString();
    this.addForm.get('a_discount').setValue(numberInString.toString());
  }
  else {
    this.addForm.get('a_discount').setValue('');
  }
}




}
