import { Component, OnInit } from '@angular/core';
import { lorem } from "faker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sentence: string;
  solved: boolean;
  enteredText: string = "";
  isStoped: boolean;
  countDown: number = 15;
  isDisabled: boolean;
  isFail: boolean;

  ngOnInit(): void {
    this.setDeafaultValues();
  }

  setDeafaultValues() {
    this.isStoped = true;
    this.isDisabled = true;
    this.solved = false;
    this.isFail = false;
  }

  startGame() {
    this.countDown = 15;
    this.isStoped = false;
    this.isDisabled = false;
    this.sentence = lorem.sentence();
    const input: HTMLInputElement = document.querySelector('#random')! as HTMLInputElement;
    setTimeout(() => {
      input.focus();
    }, 0);
    const inter: number = <any>setInterval(() => {
      this.countDown -= 1;
      this.clearTime(inter);
    }, 1000);
  }

  handlerStart() {
    this.startGame();
  }

  handlerInput(value: string) {
    this.solved = this.sentence === value;
    this.enteredText = value;
  }

  clearTime(inter: number) {
    if (this.solved) {
      clearInterval(inter);
    }
    if (this.countDown === 0) {
      clearInterval(inter);
      this.isDisabled = true;
      this.isFail = true;
    }
  }

  fail() {
    return !this.solved && this.isDisabled && !this.isStoped;
  }

  compare(letter: string, character: string): string {
    if (!character) {
      return "pending";
    }
    return letter === character ? "correct" : "incorrect";
  }
}
