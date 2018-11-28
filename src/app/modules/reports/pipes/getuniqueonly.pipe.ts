import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getuniqueonly' })
export class GetUniqueOnlyPipe implements PipeTransform {
  transform(items: any): any {
    // console.log('Items');
    // console.log(items);
    var temp = [];
    var unique = [];
    items.forEach(function(i){
      var found = false;
      temp.forEach(function(t){
        if(t.user_id == i.user_id) {
          found = true;
        }
      });
      if(!found) {
        unique.push(i);
      }
      temp.push(i);
    });
    // console.log('unique: ');
    // console.log(unique);
    return unique;
  }
}
