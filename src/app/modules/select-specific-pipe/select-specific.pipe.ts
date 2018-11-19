import { Pipe, PipeTransform } from '@angular/core';
import { DataCountsService } from '../../shared/data-counts.service';

@Pipe({ name: 'selectSpecific' })
export class SelectSpecificPipe implements PipeTransform {

  constructor(private data: DataCountsService) { }
  datacount: number;
  transform(items: any, sel?: string, name?: string): any {
    if(sel !== 'All') {
      //return sel ? items.filter(sal => sal.assigned_agents[]): items;
      var filteredItem = [];
      for(var y=0;y<items.length;y++) {
        var found = false;
        for(var x=0;x<items[y].assigned_agents.length;x++) {
          if(items[y].assigned_agents[x].id == sel) {
            found = true;
          }
        }
        if(found) {
          filteredItem.push(items[y]);
        }
      }

      this.datacount = filteredItem.length;
      this.data.changeRetailerApprovalCount(this.datacount);
      return filteredItem;
    }
    else {

      this.datacount = items.length;
      this.data.changeRetailerApprovalCount(this.datacount);
      return items;
    }
  }
}
