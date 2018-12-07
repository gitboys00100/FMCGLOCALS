import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-set-targets',
	templateUrl: './set-targets.component.html',
	styleUrls: ['./set-targets.component.css']
})
export class SetTargetsComponent implements OnInit {
	@Input() selectedAgent;

	public isLoading: boolean = true;
	public salesTargetForm: FormGroup;
	public selectedPSYear: number;
	public dateNow = new Date();
	public currentDate = new Date().toISOString();
	public currentMonthTarget: any;
	public projectedSalesPerYear: any[] = [];
	
	public projectedSales: any[] = [];
	
	constructor(
		private usersService: UsersService,
		private toastr: ToastrService
	) { }
	
	ngOnInit() {
		this.initData();
	}


	// ###############################################
	// # PUBLIC
	// ###############################################


	public initData() {
		this.projectedSalesPerYear = [];
		this.usersService.getProjectedSalesByAgent(this.selectedAgent.id)
			.map((res: any) => res.data)
			.subscribe((data: any) => {
				this.projectedSales = data;

				if (this.projectedSales) {
					let projectedSalesHolder = [];
				
					this.projectedSales.forEach((ps: any) => {
						let year = new Date(ps.month).getFullYear();

						projectedSalesHolder[year] = projectedSalesHolder[year] || {};
						let obj = projectedSalesHolder[year];

						if (Object.keys(obj).length == 0)
							this.projectedSalesPerYear.push(obj);
							
						obj.year = year;
						obj.targets = obj.targets || [];
						obj.targets.push(ps);
					});

					this.projectedSalesPerYear.sort((ps1, ps2) => {
						if (ps1.year > ps2.year) return 1;
						if (ps1.year < ps2.year) return -1;
						return 0;
					})
					this.getCurrentMonthTarget();
					this.initForm();
					this.selectedPSYear = this.projectedSalesPerYear ? this.projectedSalesPerYear[0].year : null;
				}
				else {
					this.projectedSales = [];
					this.initForm();
				}

				this.isLoading = false;
			},
			(err) => {
				this.projectedSales = [];
				this.isLoading = false;
			});
	}

	public onTargetInputChange($event) {
		$event.target.value = $event.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
	}

	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			$event.preventDefault();
			return false;
		}
	}

	public onSubmit() {
		if (this.currentMonthTarget) {
			this.usersService.updateProjectedSales(this.salesTargetForm.controls['target'].value, this.currentMonthTarget)
				.map((res: any) => res.data)
				.subscribe(
					(data: any) => {
						this.toastr.success('Target has been successfully Updated!', 'Sales Target', { positionClass: 'toast-top-right' });
						this.initData();
					},
					(err) => this.toastr.error('Failed to update sales target', 'Sales target', { positionClass: 'toast-top-right' })
				);
		}
		else {
			this.usersService.createProjectedSales(
				this.selectedAgent.id, 
				this.salesTargetForm.controls['target'].value, 
				this.dateNow.getFullYear() + "-" + (this.dateNow.getMonth() + 1)
			)
			.map((res: any) => res.body.data)
			.subscribe(
				(data : any) => {
					this.toastr.success('Target has been successfully saved!', 'Sales Target', { positionClass: 'toast-top-right' });
					this.initData();
				},
				(err) => this.toastr.error('Failed to save sales target', 'Sales target', { positionClass: 'toast-top-right' })
			);
		}
	}

	public getProjectedSalesByYear(year) {
		return this.projectedSalesPerYear.find((ps) => {
			return parseInt(ps.year) === parseInt(year);
		});
	}


	// ###############################################
	// # PRIVATE
	// ###############################################
	

	private getCurrentMonthTarget() {
		for (let i = 0; i < this.projectedSales.length; i++) {
			let psDate = new Date(this.projectedSales[i].month);
			let date1 = this.dateNow.getFullYear() + "-" + (this.dateNow.getMonth() + 1);
			let date2 = psDate.getFullYear() + "-" + (psDate.getMonth() + 1);

			if (date1 === date2) {
				this.currentMonthTarget = this.projectedSales[i];
				break;
			}
		}
	}

	private initForm() {
		this.salesTargetForm = new FormGroup({
			'target': new FormControl(this.currentMonthTarget ? this.currentMonthTarget.target : '' , Validators.required)
		});
	}
	
}
