import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'socialType'
})
export class GetSocialTypePipe implements PipeTransform {

  transform(value: string): string {
    if (value.toLocaleUpperCase() == 'FACEBOOK') {
      return 'assets/facebook.png';
    }
    if (value.toLocaleUpperCase() == 'INSTAGRAM') {
      return 'assets/instagram.png';
    }
    if (value.toLocaleUpperCase() == 'TWITTER') {
      return 'assets/twitter.png';
    }
    if (value.toLocaleUpperCase() == 'LINKEDIN') {
      return 'assets/linkedin.png';
    }
    return '';
  }

}
