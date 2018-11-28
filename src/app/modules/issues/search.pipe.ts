import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search',
	pure: false
})
export class SearchPipe implements PipeTransform {
	
	transform(itemList: any, filterString: string): any {
		if (filterString === '' || filterString === undefined || 
			filterString === null || itemList.length === 0) {
			return itemList;
		}
		
		const resultArray = [];
		for (const item of itemList) {
			Object.keys(item).forEach(function(key,index) {
                if (item[key]) {
                    let searchItem = item[key].toString().toLowerCase().trim();
				
                    if (searchItem.indexOf(filterString.toLowerCase().trim()) !== -1) {
                        let exists = false;
                        for (let i = 0; i < resultArray.length; i++) {
                            if (resultArray[i] === item ) {
                                exists = true;
                                break;
                            }
                        }
                        
                        if (!exists) resultArray.push(item);
                    }
                    else {
                        Object.keys(item[key]).forEach(childKey => {
                            if (item[key][childKey]) {
                                let childSearchItem = item[key][childKey].toString().toLowerCase().trim();
				
                                if (childSearchItem.indexOf(filterString.toLowerCase().trim()) !== -1) {
                                    let exists = false;
                                    for (let i = 0; i < resultArray.length; i++) {
                                        if (resultArray[i] === item ) {
                                            exists = true;
                                            break;
                                        }
                                    }
                                    
                                    if (!exists) resultArray.push(item);
                                }       
                            }
                        })
                    }
                }
			});
		}
		
		if (resultArray.length > 0)
			return resultArray;
		
		for (const item of itemList) {
			Object.keys(item).forEach(function(key,index) {
				if (item[key]) {
					let searchItem = item[key].toString().toLowerCase().trim();
					let filters = filterString.split(' ');
					
					for (const f of filters) {
						if (searchItem.indexOf(f.toLowerCase().trim()) !== -1) {
							let exists = false;
							for (let i = 0; i < resultArray.length; i++) {
								if (resultArray[i] === item ) {
									exists = true;
									break;
								}
							}
							
							if (!exists) resultArray.push(item);
						}
						else {
							Object.keys(item[key]).forEach(childKey => {
								if (item[key][childKey]) {
									let childSearchItem = item[key][childKey].toString().toLowerCase().trim();
					
									if (childSearchItem.indexOf(filterString.toLowerCase().trim()) !== -1) {
										let exists = false;
										for (let i = 0; i < resultArray.length; i++) {
											if (resultArray[i] === item ) {
												exists = true;
												break;
											}
										}
										
										if (!exists) resultArray.push(item);
									}       
								}
							})
						}
					}
				}
				
			});  
		}
		
		return resultArray; 
	}	
}
