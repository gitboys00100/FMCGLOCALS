import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterReturned',
    pure: false
})
export class FilterReturnedPipe implements PipeTransform {
    transform(inventoryItems: any, filterStatus, filterDate): any {
        if (inventoryItems.length === 0 || (filterStatus === '' && filterDate === ''))
            return inventoryItems;

        const resultArray = [];

        for (const item of inventoryItems) {
            if (filterStatus !== '' && filterDate !== '') {
                if (this.cleanedStr(item.status) === this.cleanedStr(filterStatus) &&
                    this.cleanedStr(item.date_returned) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (filterStatus !== '') {
                if (this.cleanedStr(item.status) === this.cleanedStr(filterStatus)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (filterDate !== '') {
                if (this.cleanedStr(item.date_returned) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
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
