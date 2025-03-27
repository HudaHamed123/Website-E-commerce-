import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array:any[], text :string): any {
    return array.filter((item)=> item.title.toLowerCase().includes(text.toLowerCase())) ;
  }

}
