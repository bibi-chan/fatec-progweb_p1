import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterCategory',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    const uniqueArray = _.uniqBy(value, 'categories');

    return uniqueArray;
  }
}
