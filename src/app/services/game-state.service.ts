import { Injectable } from '@angular/core';

import { COLORS, START_COUNT } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  count: number;
  simon: string[] = [];
  player: string[] = [];

  constructor() {
    this.count = START_COUNT;
  }

  private get randomColor(): string {
    return COLORS[Math.floor(Math.random() * 4)];
  }

  generateSimon(): string[] {
    for (let i = 0; i < this.count; i++) {
      this.appendSimon();
    }

    return this.simon;
  }

  appendSimon(increment: boolean = false): void {
    if (increment) {
      this.count++;
    }
    this.simon.push(this.randomColor);
  }

  restartSimon(): string[] {
    this.count = START_COUNT;
    return this.generateSimon();
  }

  playerGuess(val: string) {
    this.player.push(val);
    if (!this.compareSimon()) {
      this.player = [];
    }
  }

  compareSimon(): boolean {
    for (let i = 0; i < this.player.length; i++) {
      if (this.player[i] !== this.simon[i]) {
        return false;
      }
    }
    return true;
  }
}
