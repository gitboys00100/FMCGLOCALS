import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter_stock',
    pure: false
})
export class FilterStockPipe implements PipeTransform {
    transform(inventoryItems: any, transferOrder, agent, filterDate): any {
        if (inventoryItems.length === 0 || (transferOrder === '' && agent === '' && filterDate === ''))
            return inventoryItems;

        const resultArray = [];

        for (const item of inventoryItems) {
            if (transferOrder !== '' && agent !== '' && filterDate !== '') {
                if (this.cleanedStr(item.stock_issue_id) === this.cleanedStr(transferOrder) &&
                    this.cleanedStr(item.username) === this.cleanedStr(agent) &&
                    this.cleanedStr(item.delivery_date) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (transferOrder !== '' && agent !== '') {
                if (this.cleanedStr(item.stock_issue_id) === this.cleanedStr(transferOrder) &&
                    this.cleanedStr(item.username) === this.cleanedStr(agent)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (transferOrder !== '' && filterDate !== '') {
                if (this.cleanedStr(item.stock_issue_id) === this.cleanedStr(transferOrder) &&
                    this.cleanedStr(item.delivery_date) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (agent !== '' && filterDate !== '') {
                if (this.cleanedStr(item.username) === this.cleanedStr(agent) &&
                    this.cleanedStr(item.delivery_date) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (transferOrder !== '') {
                if (this.cleanedStr(item.stock_issue_id) === this.cleanedStr(transferOrder)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (agent !== '') {
                if (this.cleanedStr(item.username) === this.cleanedStr(agent)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (filterDate !== '') {
                if (this.cleanedStr(item.delivery_date) === this.cleanedStr(filterDate)) {
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
