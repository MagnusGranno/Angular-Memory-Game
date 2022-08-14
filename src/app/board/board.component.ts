import { Component, OnInit, Input } from '@angular/core';
import { ResolveStart } from '@angular/router';
import { PokeService } from '../poke.service';
import { Pokemon } from '../pokemon';
import { MatDialog } from '@angular/material/dialog';
import { RestartDialogComponent } from '../restart-dialog/restart-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  // pokemonsOne: Pokemon[] = [];
  // pokemonsTwo: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  matchedCount: number = 0;
  flippedCards: Pokemon[] = [];

  // @Input clickCard:
  constructor(private poke: PokeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPokemons();
    this.getPokemons();
    // setTimeout(() => {
    //   this.pokemons = this.pokemons.sort(() => Math.random() - 0.5);
    // }, 500);
  }

  getPokemons(): void {
    this.poke.getPokemons().subscribe((response: any) => {
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

    // this.pokemons = this.shuffte(this.pokemons);
  }

  // shuffte(array: Pokemon[]): Pokemon[] {
  //   let currentIndex = this.pokemons.length,
  //     randomIndex;

  //   while (currentIndex != 0) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }
  //   return array;
  // }

  cardClicked(index: number): void {
    const cardInfo = this.pokemons[index];
    console.log(cardInfo);

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
  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.name === cardTwo.name ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.pokemons.length) {
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
    this.getPokemons();
  }
}
