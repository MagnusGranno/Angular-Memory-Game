import { Component, OnInit } from '@angular/core';
import { GamemasterService } from '../gamemaster.service';
import { PokeService } from '../poke.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  difficulties = ['Easy', 'Medium', 'Hard'];
  constructor(
    private gameMaster: GamemasterService,
    private poke: PokeService
  ) {}

  selectedDiff = 'Easy';
  onSelect(difficulty: string) {
    this.selectedDiff = difficulty;
    this.gameMaster.setDifficulty(difficulty);
    // this.poke.loadPokemon();
    // console.log(this.poke.pokeMons);
  }

  ngOnInit(): void {}
}
