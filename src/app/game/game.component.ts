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
  show: boolean = false;

  constructor() {}

  ngOnInit() {
    this.simon = this.generateSimon(this.count);
    console.log(this.simon);
  }

  get randomColor(): string {
    return Colors[
      Math.floor(Math.random() * (Object.keys(Colors).length / 2 - 1))
    ];
  }

  generateSimon(num: number): string[] {
    const arr: string[] = [];
    for (let i = 0; i < num; i++) {
      arr.push(this.randomColor);
    }
    return arr;
  }

  appendSimon() {
    this.simon.push(this.randomColor);
  }

  handleClick(e) {
    if (this.message) this.clearMessage();
    this.player.push(e);
    console.log(this.player);
    this.compareSimon();
  }

  compareSimon() {
    if (
      this.simon.slice(0, this.player.length).toString() !=
      this.player.toString()
    ) {
      this.showMessage('wrong move');
      this.player = [];
      return;
    }

    if (this.simon.length == this.player.length) {
      this.count++;
      if (this.count == 5) this.showMessage('you win');
      this.appendSimon();
      this.player = [];

      console.log(this.simon, this.player);
      return;
    }
  }

  restart() {
    this.clearMessage();
    this.count = 1;
    this.simon = this.generateSimon(this.count);
    this.player = [];
  }

  showMessage(message: string) {
    this.message = message;
    this.show = true;
  }
  clearMessage() {
    this.message = '';
    this.show = false;
  }
}
