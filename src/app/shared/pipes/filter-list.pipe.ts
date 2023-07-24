import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(list: any[], cond: any, ...args: unknown[]): any {
    return list?.filter ? list?.filter(el => cond(el)) : list;
  }

}
