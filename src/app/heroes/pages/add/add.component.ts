import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.styles.css'],
})
export class AddComponent implements OnInit {
  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: '',
  };
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics',
    },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
      .subscribe((res) => (this.hero = res));
  }

  saveHero(): void {
    if (!this.hero.superhero.trim()) return;

    if (this.hero.id) {
      this.heroesService
        .updateHero(this.hero)
        .subscribe((_hero) => this.showSnackBar('Hero successfully updated!'));
    } else
      this.heroesService.addHero(this.hero).subscribe((hero) => {
        this.router.navigate(['/heroes/edit/', hero.id]);
        this.showSnackBar('Hero successfully created!');
      });
  }

  deleteHero(): void {
    const dialog = this.dialog.open(ConfirmationComponent, {
      data: this.hero,
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.heroesService
          .deleteHero(this.hero.id!)
          .subscribe((_res) => this.router.navigate(['./heroes/list']));
      }
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok!', {
      duration: 2500,
    });
  }

  openDialog() {}
}
