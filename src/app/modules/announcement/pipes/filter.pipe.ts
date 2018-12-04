import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(inventoryItems: any, filterDate): any {
        if (inventoryItems.length === 0 || filterDate === '')
            return inventoryItems;

        const resultArray = [];

        for (const item of inventoryItems) {
            if (filterDate !== '') {
                if (this.cleanedStr(item.timestamp.substring(0,10)) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
        }

        if(resultArray.length == 0){
          return [{'noresult':true}];
        }

        return resultArray;
    }

    cleanedStr(str) {
        return str.toString().trim().toLowerCase();
    }

    checkIfExists(booklet, resultArray) {
        for (let i = 0; i < resultArray.length; i++) {
            if (resultArray[i] == booklet) {
                return true;
            }
        }
        return false;
    }

}
