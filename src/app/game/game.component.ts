import { Component, OnInit } from '@angular/core';

import { Colors } from '../models/colors.enum';
import { sounds, sleep } from '../models/constants';

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  count: number = 2;
  simon: string[] = [];
  player: string[] = [];
  message: string;
  messageFail: boolean = true;
  messageSuccess: boolean = false;
  show: boolean = false;
  classList = {
    blue: false,
    red: false,
    yellow: false,
    green: false
  };

  get randomColor(): string {
    return Colors[Math.floor(Math.random() * 4)];
  }

  ngOnInit() {
    this.simon = this.generateSimon(this.count);
    this.showSimon();
  }

  generateSimon(num: number): string[] {
    const arr: string[] = [];
    for (let i = 0; i < num; i++) {
      arr.push(this.randomColor);
    }
    return arr;
  }

  appendSimon(): void {
    this.simon.push(this.randomColor);
    this.showSimon();
  }

  showSimon() {
    asyncForEach(this.simon, async item => {
      this.classList[item] = true;
      this.playSound(item);
      await sleep(800);
      this.classList[item] = false;
    });
  }

  compareSimon(): void {
    if (
      this.simon.slice(0, this.player.length).toString() !=
      this.player.toString()
    ) {
      this.messageFail = true;
      this.messageSuccess = false;
      this.showMessage('wrong move');
      sleep(600);
      this.player = [];
      this.showSimon();
      return;
    }

    if (this.simon.length == this.player.length) {
      this.count++;
      if (this.count == 20) {
        this.messageFail = false;
        this.messageSuccess = true;
        this.showMessage('you win');
      }
      this.appendSimon();
      this.player = [];
      return;
    }
  }

  handleClick(e): void {
    this.playSound(e);
    if (this.message) this.clearMessage();
    this.player.push(e);
    this.compareSimon();
  }

  restart(): void {
    this.clearMessage();
    this.count = 2;
    this.simon = this.generateSimon(this.count);
    this.player = [];
    this.showSimon();
  }

  showMessage(message: string): void {
    this.message = message;
    this.show = true;
  }

  clearMessage(): void {
    this.message = '';
    this.show = false;
  }

  playSound(sound: string) {
    const audio = new Audio(sounds[sound]);
    audio.play();
  }
}
