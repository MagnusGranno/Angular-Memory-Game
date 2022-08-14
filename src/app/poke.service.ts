import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Pokemon } from './pokemon';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  pokeAPIUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=8';

  getPokemons() {
    return this.http.get(this.pokeAPIUrl);
  }

  getPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
  constructor(private http: HttpClient) {}
}
