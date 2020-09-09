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

  ngOnInit(): void {
    this.solved = false;
    this.sentence = lorem.sentence();
  }

  handlerInput(value: string) {
    this.solved = this.sentence === value;
    this.enteredText = value;
  }

  compare(letter: string, character: string): string {
    if (!character) {
      return "pending";
    }
    return letter === character ? "correct" : "incorrect";
  }
}
