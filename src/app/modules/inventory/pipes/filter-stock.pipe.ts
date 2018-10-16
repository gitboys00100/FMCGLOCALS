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

          var newDate = this.getFormattedDate(item.delivery_date);

            if (transferOrder !== '' && agent !== '' && filterDate !== '') {
                if (this.cleanedStr(item.id) === this.cleanedStr(transferOrder) &&
                    this.cleanedStr(item.username) === this.cleanedStr(agent) &&
                    this.cleanedStr(newDate) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (transferOrder !== '' && agent !== '') {
                if (this.cleanedStr(item.id) === this.cleanedStr(transferOrder) &&
                    this.cleanedStr(item.username) === this.cleanedStr(agent)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (transferOrder !== '' && filterDate !== '') {
                if (this.cleanedStr(item.id) === this.cleanedStr(transferOrder) &&
                    this.cleanedStr(newDate) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (agent !== '' && filterDate !== '') {
                if (this.cleanedStr(item.username) === this.cleanedStr(agent) &&
                    this.cleanedStr(newDate) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (transferOrder !== '') {
                if (this.cleanedStr(item.id) === this.cleanedStr(transferOrder)) {
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

                if (this.cleanedStr(newDate) === this.cleanedStr(filterDate)) {
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
     getFormattedDate(date) {
      var start = new Date(date);
      var year = start.getFullYear();

      var month = (1 + start.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;

      var day = start.getDate().toString();
      day = day.length > 1 ? day : '0' + day;

      return year + '-' + month + '-' + day;
    }
}
