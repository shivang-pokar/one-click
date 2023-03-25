import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAccount'
})
export class GetAccountPipe implements PipeTransform {

  transform(value: Array<any>, args: any): any {
    let index = value.findIndex(element => element.id == args);
    if (index >= 0) {
      return value[index];
    }
    return null;
  }

}
