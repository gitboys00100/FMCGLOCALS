import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

  transform(arr: any[], key: string, reverse: boolean): any[] {
    if(!reverse) {
      return arr.sort((retailer1, retailer2): number => {
        if (retailer1[key] < retailer2[key]) return -1;
        if (retailer1[key] > retailer2[key]) return 1;
        return 0;
      });
    }
    else {
      return arr.sort((retailer1, retailer2): number => {
        if (retailer1[key] < retailer2[key]) return 1;
        if (retailer1[key] > retailer2[key]) return -1;
        return 0;
      });
    }
  }

}
