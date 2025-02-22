import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts',
  pure: false
})
export class FilterProductsPipe implements PipeTransform {


  transform(value: any[], filterString: any, propName: any): any {
    if (value.length === 0 || filterString === '' || filterString === undefined || filterString === 'All') {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }

    return resultArray;

  }

}
