import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchProduct: any): any[] {
    if (!items) { return []; }
    if (!searchProduct) { return items; }
    searchProduct = searchProduct.toLocaleLowerCase();
    return items.filter((it) => {
      return it.toLocaleLowerCase().includes(searchProduct);
    });
  }
}
