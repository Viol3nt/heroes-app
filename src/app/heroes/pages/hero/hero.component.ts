import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
      img {
        margin-top: 1rem;
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroComponent implements OnInit {
  hero!: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  goBack() {
    this.router.navigate(['heroes/list']);
  }
}
