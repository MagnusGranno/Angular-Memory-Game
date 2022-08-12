import { Component, OnInit } from '@angular/core';
import { GamemasterService } from '../gamemaster.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  difficulty: string = 'easy';
  board = this.gameMaster.board;
  constructor(private gameMaster: GamemasterService) {}

  ngOnInit(): void {
    this.difficulty = this.gameMaster.getDifficulty();
  }

  consolemyshit(): void {
    console.log(this.difficulty);
  }
}
