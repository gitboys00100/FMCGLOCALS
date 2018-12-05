import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getCompanyName'
})
export class GetCompanyName implements PipeTransform {
    transform(company_id: string, company_list: any[]): string {
      var company_name = '';
      for(var x=0;x<company_list.length;x++) {
        if(company_list[x].id == company_id) {
          company_name = company_list[x].name;
        }
      }
      return company_name;
    }
}
