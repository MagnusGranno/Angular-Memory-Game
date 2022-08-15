import { Component, OnInit, Input } from '@angular/core';
import { PokeService } from '../poke.service';
import { Pokemon } from '../pokemon';
import { MatDialog } from '@angular/material/dialog';
import { RestartDialogComponent } from '../restart-dialog/restart-dialog.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  pokemons: Pokemon[] = [];
  matchedCount: number = 0;
  flippedCards: Pokemon[] = [];
  difficulty: string = '';
  columns: number = 4;
  shuffling: boolean = false;

  constructor(
    private poke: PokeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.difficulty = this.router.url;
    this.setDifficulty(this.difficulty);
  }

  setDifficulty(diff: string): void {
    switch (diff) {
      case '/Easy':
        this.columns = 4;
        this.getPokemons(8);
        this.getPokemons(8);
        this.shuffling = true;
        this.pokemons.sort(() => Math.random() - 0.5);
        this.shuffling = false;
        break;
      case '/Medium':
        this.columns = 6;
        this.getPokemons(12);
        this.getPokemons(12);
        this.shuffling = true;
        this.pokemons.sort(() => Math.random() - 0.5);
        this.shuffling = false;
        break;
      case '/Hard':
        this.columns = 8;
        this.getPokemons(16);
        this.getPokemons(16);
        this.shuffling = true;
        this.pokemons.sort(() => Math.random() - 0.5);
        this.shuffling = false;
        break;
    }
  }

  getPokemons(num: number): void {
    this.poke.getPokemons(num).subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.poke.getPokemon(result.name).subscribe((uniqResponse: any) => {
          const pokemon: Pokemon = {
            name: uniqResponse.name,
            url: uniqResponse.sprites.back_default,
            type: uniqResponse.types[0].type.name,
            state: 'default',
          };
          this.pokemons.push(pokemon);
        });
      });
    });
  }

  cardClicked(index: number): void {
    const cardInfo = this.pokemons[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }
    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();
    }
  }

  isFinished: boolean = false;
  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.name === cardTwo.name ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.pokemons.length / 2) {
          this.isFinished = true;

          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true,
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        }
      }
    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.pokemons = [];
    this.setDifficulty(this.difficulty);
  }
}
