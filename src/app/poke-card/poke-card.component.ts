import { Component, OnInit, Input } from '@angular/core';
import { identity } from 'rxjs';
import { Colors } from '../colors';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css'],
})
export class PokeCardComponent implements OnInit {
  @Input() pokemon!: any;

  myColor: string = 'white';

  colors: Colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
  };

  constructor() {}

  ngOnInit(): void {
    const myString = this.getType();
    this.myColor = this.colors[myString];
  }

  getType(): string {
    return this.pokemon.types[0].type.name;
  }
}
