import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaType'
})
export class MediaTypePipe implements PipeTransform {

  transform(fileObject: any): any {

    if (fileObject.type == 'IMAGE') {
      return `<img src="${fileObject.url}" alt="" class="w-100 h-100">`
    }
    if (fileObject.type == 'VIDEO') {
      return `<video src="${fileObject.url}" poster></video>`
    }

    return null;
  }

}
