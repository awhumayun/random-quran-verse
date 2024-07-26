import { Component, OnInit } from "@angular/core";
import {
  animate,
  transition,
  trigger,
  state,
  style,
} from "@angular/animations";
import { Verse } from "./interfaces/verse";
import { VerseService } from "./services/verse.service";
import { DEFAULT_TRANSLATION } from "./constants/data";
import { TOTAL_VERSES } from "./constants/data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("fade", [
      state(
        "out",
        style({
          opacity: 0,
        })
      ),
      state(
        "in",
        style({
          opacity: 1,
        })
      ),
      transition("out => in", [animate("2s")]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  verse?: Verse = undefined;
  translationText: string = "";
  isNew: boolean = true;

  constructor(private verseService: VerseService) {}

  ngOnInit(): void {
    this.getRandomVerse();
  }

  getRandomVerse(): void {
    this.isNew = true;

    const random = Math.floor(Math.random() * TOTAL_VERSES) + 1;

    this.verseService.getVerse(random).subscribe(
      (verseData) => {
        this.verse = verseData;
        this.verseService
          .getVerseTranslation(random, DEFAULT_TRANSLATION)
          .subscribe(
            ({
              data: {
                numberInSurah,
                text,
                surah: { number },
              },
            }) => {
              this.translationText = `(${number}:${numberInSurah}) ${text}`;
              this.isNew = false;
            },
            (error) => {
              console.error("Error fetching translation", error);
              this.isNew = false;
            }
          );
      },
      (error) => {
        console.error("Error fetching verse", error);
        this.isNew = false;
      }
    );
  }
}
