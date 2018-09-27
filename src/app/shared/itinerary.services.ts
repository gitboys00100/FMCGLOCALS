export class ItineraryService {
	private itineraryList = [
		{
			agent: 'Juan Dela Cruz',
			itinerary: 'District 1',
			itinerary_list: [
				{
					order: 1,
					retailer: 'test',
					no_of_items: 100,
					balance: 1000
				}
			],
			date: '1536624000000'
		},
		{
			agent: 'Jun Chorba',
			itinerary: 'District 2',
			itinerary_list: [
				{
					order: 1,
					retailer: 'Jun\'s Grocery',
					no_of_items: 100,
					balance: 10000
				},
				{
					order: 2,
					retailer: 'Mel Store',
					no_of_items: 20,
					balance: 1000
				}

			],
			date: '1536624000000'
		},
		{
			agent: 'John Doe',
			itinerary: 'District 2',
			itinerary_list: [
				{
					order: 1,
					retailer: 'Jun\'s Grocery',
					no_of_items: 100,
					balance: 10000
				},
				{
					order: 2,
					retailer: 'Mel Store',
					no_of_items: 20,
					balance: 1000
				}

			],
			date: '1536624000000'
		},
		{
			agent: 'Peter Parker',
			itinerary: 'District 2',
			itinerary_list: [
				{
					order: 1,
					retailer: 'Jun\'s Grocery',
					no_of_items: 100,
					balance: 10000
				},
				{
					order: 2,
					retailer: 'Mel Store',
					no_of_items: 20,
					balance: 1000
				}

			],
			date: '1536624000000'
		},
		{
			agent: 'Bloody Mary',
			itinerary: 'District 2',
			itinerary_list: [
				{
					order: 1,
					retailer: 'Jun\'s Grocery',
					no_of_items: 100,
					balance: 10000
				},
				{
					order: 2,
					retailer: 'Mel Store',
					no_of_items: 20,
					balance: 1000
				}

			],
			date: '1536624000000'
		},
		{
			agent: 'Tony Stark',
			itinerary: 'District 2',
			itinerary_list: [
				{
					order: 1,
					retailer: 'Jun\'s Grocery',
					no_of_items: 100,
					balance: 10000
				},
				{
					order: 2,
					retailer: 'Mel Store',
					no_of_items: 20,
					balance: 1000
				}

			],
			date: '1536624000000'
		},
		{
			agent: 'Steve Rogers',
			itinerary: 'District 2',
			itinerary_list: [
				{
					order: 1,
					retailer: 'Jun\'s Grocery',
					no_of_items: 100,
					balance: 10000
				},
				{
					order: 2,
					retailer: 'Mel Store',
					no_of_items: 20,
					balance: 1000
				}

			],
			date: '1536624000000'
		}

	];


	getItineraryList() {
		return this.itineraryList.slice();
	}


}
