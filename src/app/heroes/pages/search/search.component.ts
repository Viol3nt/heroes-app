import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  condition: string = '';
  heroes: Hero[] = [];
  selectedHero: Hero | undefined;

  constructor(private heroesService: HeroesService, private router: Router) {}

  ngOnInit(): void {}

  suggestions(): void {
    this.heroesService.getSuggestions(this.condition).subscribe((res) => {
      this.heroes = res;
    });
  }

  search(event: MatAutocompleteSelectedEvent): void {
    const hero: Hero = event.option.value;

    if (!hero) {
      this.selectedHero = undefined;
      return;
    }

    this.heroes = [];
    this.condition = hero.superhero!;

    this.heroesService
      .getHero(hero.id!)
      .subscribe((hero) => (this.selectedHero = hero));
  }
}
