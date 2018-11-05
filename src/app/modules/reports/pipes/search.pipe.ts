import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(inventoryItems: any, query: string) {
        if (inventoryItems.length === 0 || query === '' ||
            query === undefined || query === null) {
            return inventoryItems;
        }

        const resultArray = [];
        //console.log('x');
        //console.log(inventoryItems);
        for (const rep of inventoryItems) {
            rep.items.forEach(function(res) {
              if(query.trim().toLowerCase() === res.item.name.toLowerCase()) {
                let exist = false;
                for (let i = 0; i < resultArray.length; i++) {
                    if (resultArray[i] == rep ) {
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    resultArray.push(rep);
                }
              }
            });
            if (query.trim().toLowerCase() === rep.user.first_name.toLowerCase()) {
                let exist = false;
                for (let i = 0; i < resultArray.length; i++) {
                    if (resultArray[i] == rep ) {
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    resultArray.push(rep);
                }
            }
            if (query.trim().toLowerCase() === rep.user.last_name.toLowerCase()) {
                let exist = false;
                for (let i = 0; i < resultArray.length; i++) {
                    if (resultArray[i] == rep ) {
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    resultArray.push(rep);
                }
            }

        }

        if (resultArray.length > 0)
            return resultArray;


        for (const item of inventoryItems) {
            let searchItem;
            Object.keys(item).forEach(function(key,index) {
                if(key == 'items') {
                  for(var x=0;x<item[key].length;x++) {
                    searchItem = item[key][x].item.name.toString().toLowerCase().trim();
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
                  }
                }
                else if(key == 'user') {
                  searchItem = item[key].first_name.toString().toLowerCase().trim();
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
                }
                else {
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

                }

            });
        }

        return resultArray;
    }
}
