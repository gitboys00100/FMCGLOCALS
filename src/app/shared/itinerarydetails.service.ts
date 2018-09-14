export class ItinerarydetailsService {

  constructor() { }

  private itineraryList = [
		{
			it_label: 'Juan Dela Cruz',
			no_of_retailers: 10
		},
		{
                        it_label: 'Maria Dela Cruz',
                        no_of_retailers: 15
                }
   ];


  getItineraryDetailsList() {
     return this.itineraryList.slice();
  }

}
