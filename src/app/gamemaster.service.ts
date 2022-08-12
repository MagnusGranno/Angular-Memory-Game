import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GamemasterService {
  currentDifficulty = 'easy';
  board = this.createBoard(16);
  constructor() {}

  createBoard(num: number): number[] {
    let board: number[] = [];
    for (let i = 1; i <= num; i++) {
      board.push(i);
    }
    return board;
  }
  getDifficulty(): string {
    return this.currentDifficulty;
  }

  setDifficulty(difficulty: string) {
    this.currentDifficulty = difficulty;
    switch (difficulty) {
      case 'Easy':
        this.createBoard(16);
        break;
      case 'Medium':
        this.createBoard(36);
        break;
      case 'Hard':
        this.createBoard(64);
        break;
    }
  }
}
