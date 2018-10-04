import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(it_items: any, query: any): any {
                // console.log(!args);
                // if(!value)return null;
                // if(!args)return value;
                //
                // args = args.toLowerCase();
                //
                // return value.filter(function(item){
                //     return JSON.stringify(item.it_label).toLowerCase().includes(args);
                // });

                if (it_items.length === 0 || query === '' ||
                    query === undefined || query === null) {
                    return it_items;
                }

                const resultArray = [];

                for (const item of it_items) {

        
                    if (query.trim().toLowerCase() === item.it_label.toLowerCase()) {
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


                for (const item of it_items) {
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
