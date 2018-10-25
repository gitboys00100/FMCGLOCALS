import { Retailer } from './retailer.model';
import { testRetailerData } from './test-data';

export class RetailerService {
    private retailer_data: Retailer[] = testRetailerData;

    getRetailerData() {
        return this.retailer_data.slice();
    }
}
