import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeEmpties'
})
export class RemoveEmptiesPipe implements PipeTransform {

  transform(arr: any[], ...args: any[]): any {
    return arr.filter(x => x !== undefined && x !== null);
  }

}
