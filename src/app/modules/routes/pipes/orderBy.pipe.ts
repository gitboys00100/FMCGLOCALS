import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform(arr: any[], key: string, type: string): any[] {
    if (type === 'asc') {
      return arr.sort((retailer1, retailer2): number => {
        if (retailer1[key] > retailer2[key]) return 1;
        if (retailer1[key] < retailer2[key]) return -1;
        return 0;
      });
    }
    else {
      return arr.sort((retailer1, retailer2): number => {
        if (retailer1[key] > retailer2[key]) return -1;
        if (retailer1[key] < retailer2[key]) return 1;
        return 0;
      });
    }
  }

}
