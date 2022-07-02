import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if(value) {
      return environment.apiUrl + '/uploads/' + value;
    }
    return '/assets/image/img.png';
  }
}
