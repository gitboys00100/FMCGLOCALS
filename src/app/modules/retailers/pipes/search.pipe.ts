import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(retailerData: any, query: string) {
        if (retailerData.length === 0 || query === '' ||
            query === undefined || query === null) {
            return retailerData;
        }

        const resultArray = [];

        for (const item of retailerData) {
            if (query.trim().toLowerCase() === item.name.toLowerCase()) {
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


        for (const item of retailerData) {
            let searchItem;
            Object.keys(item).forEach(function(key,index) {
                searchItem = item[key].toString().toLowerCase().trim();
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

        return resultArray;
    }
}
