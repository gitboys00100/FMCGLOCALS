import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(inventoryItems: any, category, subCategory, filterDate): any {
        if (inventoryItems.length === 0 || (category === '' && subCategory === '' && filterDate === ''))
            return inventoryItems;
//category uom, subcat size
        const resultArray = [];

        for (const item of inventoryItems) {

            var newDate = this.getFormattedDate(item.timestamp);

            if (category !== '' && subCategory !== '' && filterDate !== '') {
                if (this.cleanedStr(item.category.name) === this.cleanedStr(category) &&
                    this.cleanedStr(item.category.name) === this.cleanedStr(subCategory) &&
                    this.cleanedStr(newDate) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (category !== '' && subCategory !== '') {
                if (this.cleanedStr(item.category.name) === this.cleanedStr(category) &&
                    this.cleanedStr(item.category.name) === this.cleanedStr(subCategory)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (category !== '' && filterDate !== '') {
                if (this.cleanedStr(item.category.name) === this.cleanedStr(category) &&
                    this.cleanedStr(newDate) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (subCategory !== '' && filterDate !== '') {
                if (this.cleanedStr(item.category.name) === this.cleanedStr(subCategory) &&
                    this.cleanedStr(newDate) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (category !== '') {
                if (this.cleanedStr(item.category.name) === this.cleanedStr(category)) {
                    if (!this.checkIfExists(item, resultArray))
                        resultArray.push(item);
                }
            }
            else if (subCategory !== '') {
                if (this.cleanedStr(item.category.name) === this.cleanedStr(subCategory)) {
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
