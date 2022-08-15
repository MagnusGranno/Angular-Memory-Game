import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  pokeAPIUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=';

  getPokemons(limit: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  }

  getPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
  constructor(private http: HttpClient) {}
}
