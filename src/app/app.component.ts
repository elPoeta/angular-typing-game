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
  countDown: number;
  isDisabled: boolean;

  ngOnInit(): void {
    this.countDown = 15;
    this.isStoped = true;
    this.isDisabled = true;
    this.solved = false;
    this.sentence = lorem.sentence();
  }

  handlerStart() {
    this.isStoped = false;
    this.isDisabled = false;
    const input: HTMLInputElement = document.querySelector('#random')! as HTMLInputElement;
    setTimeout(() => {
      input.focus();
    }, 0);
    const inter = setInterval(() => {
      this.countDown -= 1;
      this.clearTime(inter);
    }, 1000);
  }

  handlerInput(value: string) {
    this.solved = this.sentence === value;
    this.enteredText = value;
  }

  clearTime(inter) {
    if (this.countDown === 0) {
      clearInterval(inter);
      this.isDisabled = true;
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
