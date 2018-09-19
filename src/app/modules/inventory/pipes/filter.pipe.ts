import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(inventoryItems: any, category, subCategory, filterDate): any {
        if (inventoryItems.length === 0 || (category === '' && subCategory === '' && filterDate === ''))
            return inventoryItems;
        
        const resultArray = [];
        
        for (const item of inventoryItems) {        
            if (category !== '' && subCategory !== '' && filterDate !== '') {
                if (this.cleanedStr(item.category) === this.cleanedStr(category) && 
                    this.cleanedStr(item.sub_category) === this.cleanedStr(subCategory) &&
                    this.cleanedStr(item.date_added) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray)) 
                        resultArray.push(item);
                }
            }
            else if (category !== '' && subCategory !== '') {
                if (this.cleanedStr(item.category) === this.cleanedStr(category) && 
                    this.cleanedStr(item.sub_category) === this.cleanedStr(subCategory)) {
                    if (!this.checkIfExists(item, resultArray)) 
                        resultArray.push(item);
                }
            }
            else if (category !== '' && filterDate !== '') {
                if (this.cleanedStr(item.category) === this.cleanedStr(category) && 
                    this.cleanedStr(item.date_added) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray)) 
                        resultArray.push(item);
                }
            }
            else if (subCategory !== '' && filterDate !== '') {
                if (this.cleanedStr(item.subCategory) === this.cleanedStr(subCategory) && 
                    this.cleanedStr(item.date_added) === this.cleanedStr(filterDate)) {
                    if (!this.checkIfExists(item, resultArray)) 
                        resultArray.push(item);
                }
            }
            else if (category !== '') {
                if (this.cleanedStr(item.category) === this.cleanedStr(category)) {
                    if (!this.checkIfExists(item, resultArray)) 
                        resultArray.push(item);
                }
            }
            else if (subCategory !== '') {
                if (this.cleanedStr(item.sub_category) === this.cleanedStr(subCategory)) {
                    if (!this.checkIfExists(item, resultArray)) 
                        resultArray.push(item);
                }
            }
            else if (filterDate !== '') {
                if (this.cleanedStr(item.date_added) === this.cleanedStr(filterDate)) {
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