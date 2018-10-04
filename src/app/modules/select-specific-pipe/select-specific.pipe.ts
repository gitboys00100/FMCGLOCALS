import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectSpecific' })
export class SelectSpecificPipe implements PipeTransform {
  transform(items: any, sel?: string, name?: string): any {
    if(sel !== 'All') {
      return sel ? items.filter(sal => sal.agent === sel): items;
    }
    else {
      return items;
    }
  }
}
