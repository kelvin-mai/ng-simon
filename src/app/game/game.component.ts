import { Component, OnInit } from '@angular/core';

import { Colors } from '../models/colors.enum';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  count: number = 1;
  simon: string[] = [];
  player: string[] = [];
  message: string;

  constructor() {}

  ngOnInit() {
    this.simon = this.generateSimon(this.count);
    console.log(this.simon);
  }

  generateSimon(num: number): string[] {
    const arr: string[] = [];

    for (let i = 0; i < num; i++) {
      const rand = Math.floor(
        Math.random() * (Object.keys(Colors).length / 2 - 1)
      );
      arr.push(Colors[rand]);
    }
    console.log(arr);
    return arr;
  }

  handleClick(e) {
    if (this.message) this.message = '';
    this.player.push(e);
    console.log(this.player);
    this.compareSimon();
  }

  compareSimon() {
    if (
      this.simon.slice(0, this.player.length).toString() !=
      this.player.toString()
    ) {
      this.message = 'wrong move';
      this.player = [];
      return;
    }

    if (this.simon.length == this.player.length) {
      this.count++;
      this.simon = this.generateSimon(this.count);
      this.player = [];
      return;
    }
  }

  restart() {
    this.count = 1;
    this.simon = this.generateSimon(this.count);
    this.player = [];
  }
}
