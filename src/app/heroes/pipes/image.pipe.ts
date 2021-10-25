import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.alt_image && !hero.id) {
      return 'assets/no-image.png';
    } else if (hero.alt_image) {
      return hero.alt_image;
    }
    return `assets/heroes/${hero.id}.jpg`;
  }
}
