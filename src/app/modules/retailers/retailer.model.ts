export class Retailer {

    constructor(
        public retailer_id: number,
        public company_id: number,
        public name: string,
        public owner: string,
        public coordinates: string,
        public credit_limit: number,
        public current_credit: number,
        public status: string,
        public image: string,
        public house_number: string,
        public street_name: string,
        public township: string,
        public country: string,
    ) {}

}
