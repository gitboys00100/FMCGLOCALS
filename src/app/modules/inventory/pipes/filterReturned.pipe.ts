import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterReturned',
    pure: false
})
export class FilterReturnedPipe implements PipeTransform {
    transform(inventoryItems: any, filterStatus, filterDate, filterReason): any {
        if (inventoryItems.length === 0 || (filterStatus === '' && filterDate === '' && filterReason === ''))
            return inventoryItems;

        const resultArray = [];

        for (const item of inventoryItems) {
            if (filterStatus !== '' && filterDate !== '' && filterReason !== '') {
                if (this.cleanedStr(item.status) === this.cleanedStr(filterStatus) &&
                    this.cleanedStr(item.timestamp) === this.cleanedStr(filterDate) &&
                    this.cleanedStr(item.reason) === this.cleanedStr(filterReason)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }

            else if (filterStatus !== '' && filterDate !== '' && filterReason == '') {
                if (this.cleanedStr(item.status) === this.cleanedStr(filterStatus) &&
                    this.cleanedStr(item.timestamp) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }

            else if (filterStatus !== '' && filterDate === '' && filterReason !== '') {
                if (this.cleanedStr(item.status) === this.cleanedStr(filterStatus) &&
                    this.cleanedStr(item.reason) === this.cleanedStr(filterReason)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }

            else if (filterStatus === '' && filterDate !== '' && filterReason !== '') {
                if (this.cleanedStr(item.reason) === this.cleanedStr(filterReason) &&
                    this.cleanedStr(item.timestamp) === this.cleanedStr(filterDate)) {
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
                if (this.cleanedStr(item.timestamp) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (filterReason !== '') {
                if (this.cleanedStr(item.reason) === this.cleanedStr(filterReason)) {
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
