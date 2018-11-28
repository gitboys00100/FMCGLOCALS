import { Pipe, PipeTransform } from '@angular/core';
import { DataCountsService } from '../../../shared/data-counts.service';

@Pipe({
    name: 'searchremittance',
    pure: false
})
export class SearchRemittancePipe implements PipeTransform {
    constructor(private data: DataCountsService) { }
    datacount: number;
    transform(inventoryItems: any, query: string) {
        if (inventoryItems.length === 0 || query === '' ||
            query === undefined || query === null) {
            return inventoryItems;
        }

        const resultArray = [];

        for (const item of inventoryItems) {
            if (query.trim().toLowerCase() === item.agent.first_name.toLowerCase()) {
                let exist = false;
                for (let i = 0; i < resultArray.length; i++) {
                    if (resultArray[i] == item ) {
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    resultArray.push(item);
                }
            }
            if (query.trim().toLowerCase() === item.agent.last_name.toLowerCase()) {
                let exist = false;
                for (let i = 0; i < resultArray.length; i++) {
                    if (resultArray[i] == item ) {
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    resultArray.push(item);
                }
            }
        }

        if (resultArray.length > 0)
            return resultArray;


        for (const item of inventoryItems) {
            let searchItem;
            Object.keys(item).forEach(function(key,index) {
                if(key == 'agent') {
                  searchItem = item[key]['first_name'].toString().toLowerCase().trim()+' '+item[key]['last_name'].toString().toLowerCase().trim();
                }
                else if(key == 'total_amount'){
                  searchItem = item[key].toString().toLowerCase().trim()
                }
                else {
                  searchItem = '';
                }
                //console.log(key);
                //searchItem = item[key].toString().toLowerCase().trim();
                let filters = query.split(' ');

                for (const f of filters) {
                    if (searchItem.indexOf(f.toLowerCase().trim()) !== -1) {
                        let exist = false;
                        for (let i = 0; i < resultArray.length; i++) {
                            if (resultArray[i] == item ) {
                                exist = true;
                                break;
                            }
                        }

                        if (!exist) {
                            resultArray.push(item);
                        }

                    }
                }
            });
        }

        this.datacount = resultArray.length;
        this.data.changeRemittanceReceivableCount(this.datacount);
        return resultArray;
    }
}
