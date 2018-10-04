import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-agentitinerary',
  templateUrl: './agentitinerary.component.html',
  styleUrls: ['./agentitinerary.component.css']
})
export class AgentitineraryComponent implements OnInit {
  @Input() itinerary;
  constructor(private elRef: ElementRef) { }

  public isOpen: boolean = false;

  ngOnInit() {
  }

  public toggleBody() {
  	let rBody = this.elRef.nativeElement.querySelector('.row-body');
	if(!this.isOpen) {
		if (rBody.classList)
			rBody.classList.add('open');
		else
			rBody.className += 'open';
	}
	else {
		if (rBody.classList)
			rBody.classList.remove('open');
		else
			rBody.className = rBody.className.replate(/ *\b\S*?selected\S*\b/g, '');
	}
	this.isOpen = !this.isOpen;
   }

   public getTotalBalance(itineraryVal) {
   	let total = 0;

	for (let i = 0; i < itineraryVal.itinerary_list.length; i++) {
		total += parseFloat(itineraryVal.itinerary_list[i].balance);
	
	}

	return total;
   }
}
