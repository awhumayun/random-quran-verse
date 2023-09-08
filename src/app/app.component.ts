import { Component } from "@angular/core";
import {
  animate,
  transition,
  trigger,
  state,
  style,
} from "@angular/animations";
import { Verse } from "./interfaces/verse";
import { VerseService } from "./services/verse.service";
import { DEFAULT_TRANSLATION } from "./constants/translations";
import { VERSES } from "./constants/verses";

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
export class AppComponent {
  verse?: Verse;
  translationText?: string;

  isNew: boolean = true;

  constructor(private verseService: VerseService) {}

  async ngOnInit(): Promise<void> {
    await this.getRandomVerse();
  }

  async getRandomVerse(): Promise<void> {
    this.isNew = true;

    const random = Math.floor(Math.random() * VERSES) + 1;
    const [
      verse,
      {
        data: {
          numberInSurah,
          text,
          surah: { number },
        },
      },
    ] = await Promise.all([
      this.verseService.getVerse(random),
      this.verseService.getVerseTranslation(random, DEFAULT_TRANSLATION),
    ]);
    this.verse = verse;
    this.translationText = `(${number}:${numberInSurah}) ${text}`;

    this.isNew = false;
  }
}
