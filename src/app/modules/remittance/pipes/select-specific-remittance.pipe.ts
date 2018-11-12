import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectSpecificRemittance' })
export class SelectSpecificPipeRemittance implements PipeTransform {
  transform(items: any, sel?: string, name?: string): any {
    console.log(items);
    if(sel !== 'All') {
      //return sel ? items.filter(sal => sal.assigned_agents[]): items;
      var filteredItem = [];
      for(var y=0;y<items.length;y++) {
        var found = false;
        if(items[y].agent.id == sel) {
          found = true;
        }
        if(found) {
          filteredItem.push(items[y]);
        }
      }
      return filteredItem;
    }
    else {
      return items;
    }
  }
}
