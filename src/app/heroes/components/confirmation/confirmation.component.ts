import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: [],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Hero,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {}

  deleteHero(): void {
    // this.heroesService.deleteHero(this.data.id!).subscribe(console.log);
  }
}
