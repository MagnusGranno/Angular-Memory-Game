import { Component, OnInit } from '@angular/core';
import { GamemasterService } from '../gamemaster.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  difficulties = ['Easy', 'Medium', 'Hard'];
  constructor(private gameMaster: GamemasterService) {}

  selectedDiff = 'Easy';
  onSelect(difficulty: string) {
    this.selectedDiff = difficulty;
    this.gameMaster.setDifficulty(difficulty);
  }

  ngOnInit(): void {}
}
