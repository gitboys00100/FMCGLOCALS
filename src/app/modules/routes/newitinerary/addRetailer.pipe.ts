import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addRetailer' })
export class AddRetailerPipe implements PipeTransform {
  transform(): any[] {
    return ['xc','sd'];
  }
}
