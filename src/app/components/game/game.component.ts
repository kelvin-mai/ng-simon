import { Component, OnInit } from '@angular/core';

import { GameStateService } from '../../services/game-state.service';
import { sleep } from '../../models/constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  count: number;
  colors: any = {
    red: false,
    blue: false,
    green: false,
    yellow: false
  };

  constructor(private game: GameStateService) {}

  ngOnInit() {
    this.game.state.subscribe(state => {
      console.log(state);
      if (this.count != state.count) {
        this.count = state.count;
        this.teasePlayer(state.simon);
      }
    });
    this.game.generateSimon();
  }

  playerGuess(e: string) {
    this.game.playerGuess(e);
  }

  async teasePlayer(simon: string[]) {
    for (let i = 0; i < simon.length; i++) {
      this.colors[simon[i]] = true;
      await sleep(500);
      this.colors[simon[i]] = false;
      await sleep(200);
    }
  }
}
