import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { Connection, FileItem } from '@one-click/data';

@Pipe({
  name: 'validationMessage',
})
export class ValidationMessagePipe implements PipeTransform {
  transform(attachList: Array<FileItem>, isReel?: boolean): unknown {
    if (attachList[0].type == "IMAGE") {
      return "Image/Video should have ratio between 4:5 and 1.91:1.";
    }
    if (attachList[0].type == "VIDEO" && isReel) {
      return "Image/Video should have ratio between 4:5 and 1.91:1. and if reels video should have ratio 9:16";
    }
    else {
      return "Image/Video should have ratio between 4:5 and 1.91:1.";
    }
  }
}