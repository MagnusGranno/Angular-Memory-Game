import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  pokemonsOne: any[] = [];
  pokemonsTwo: any[] = [];
  pokemons: any[] = [];
  constructor(private poke: PokeService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.poke.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.poke.getPokemon(result.name).subscribe((uniqResponse: any) => {
          this.pokemonsOne.push(uniqResponse);
          this.pokemonsTwo.push(uniqResponse);
          this.pokemons = [...this.pokemonsOne, ...this.pokemonsTwo];
          this.pokemons.sort((_) => Math.random() - 0.5);
        });
      });
    });
  }
}
