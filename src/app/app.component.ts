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
import {
  DEFAULT_TRANSLATION,
  TOTAL_VERSES,
  BASE_QURAN_URL,
} from "./constants/data";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

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
  verseText: string = "";
  verseLink: string = "";
  translationText: string = "";
  isNew: boolean = true;

  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  constructor(private verseService: VerseService) {}

  ngOnInit(): void {
    this.getRandomVerse();
  }

  getRandomVerse(): void {
    this.isNew = true;

    const random = Math.floor(Math.random() * TOTAL_VERSES) + 1;
    this.verseService.getVerse(random).subscribe(
      (verse: Verse) => {
        this.verseText = verse.data.text;
        this.verseService
          .getVerseTranslation(random, DEFAULT_TRANSLATION)
          .subscribe(
            (verseTranslation: Verse) => {
              const {
                data: {
                  numberInSurah,
                  text,
                  surah: { number },
                },
              } = verseTranslation;
              this.translationText = `(${number}:${numberInSurah}) ${text}`;
              this.verseLink = `${BASE_QURAN_URL}/${number}?startingVerse=${numberInSurah}&translations=${DEFAULT_TRANSLATION.number}`;
              this.isNew = false;
            },
            (error: Error) => {
              console.error("Error fetching translation", error);
              this.isNew = false;
            }
          );
      },
      (error: Error) => {
        console.error("Error fetching verse", error);
        this.isNew = false;
      }
    );
  }
}
