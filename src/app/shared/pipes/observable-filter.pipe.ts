import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'observableFilter'
})
export class ObservableFilterPipe implements PipeTransform {

  transform(observable: Observable<any>, searchVal: string): any {
    return observable;
  }

}
