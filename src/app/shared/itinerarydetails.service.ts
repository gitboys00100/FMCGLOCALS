export class ItinerarydetailsService {

  constructor() { }

  private itineraryList = [
		{
			it_label: 'Fern The Human',
			no_of_retailers: 10
		},
    {
      it_label: 'Finn The Human',
      no_of_retailers: 1
    },
    {
      it_label: 'Jake The Dog',
      no_of_retailers: 2
    },
    {
      it_label: 'BMO',
      no_of_retailers: 3
    },
    {
      it_label: 'Ice King / Simon Petrikov',
      no_of_retailers: 4
    },
    {
      it_label: 'Susan Strong',
      no_of_retailers: 5
    },
    {
      it_label: 'Princess Bubblegum',
      no_of_retailers: 6
    },
    {
      it_label: 'Marceline The Vampire Queen',
      no_of_retailers: 7
    },
    {
      it_label: 'Lady Rainicorn',
      no_of_retailers: 8
    },
    {
      it_label: 'Neptr',
      no_of_retailers: 9
    },
		{
                        it_label: 'Banana Guard no. 200',
                        no_of_retailers: 15
                }
   ];


  getItineraryDetailsList() {
     return this.itineraryList.slice();
  }

}
