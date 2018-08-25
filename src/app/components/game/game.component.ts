import { Component, OnInit } from '@angular/core';

import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(private game: GameStateService) {}

  ngOnInit() {
    console.log(this.game.generateSimon());
  }

  playerGuess(e: string) {
    this.game.playerGuess(e);
  }
}
