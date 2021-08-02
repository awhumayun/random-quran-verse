import { Component } from '@angular/core';
import { Verse } from './interfaces/verse';
import { TRANSLATIONS } from '../app/classes/translation-data';
import { VerseService } from './services/verse.service';
import { animate, transition, trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('out', style({
        opacity: 0,
      })),
      state('in', style({
        opacity: 1,
      })),
      transition('out => in', [
        animate('2s')
      ])
    ])
  ]
})
export class AppComponent {
  numOfVerses = 6236;
  
  verse!: Verse;
  verseTranslation!: Verse;
  translationText!: string;

  translation = TRANSLATIONS[6];

  isNew: boolean = true;

  constructor(private verseService: VerseService) { }

  async ngOnInit() { 
    await this.getRandomVerse();
  }

  async getRandomVerse(): Promise<void> {
    this.isNew = true;
    const random = Math.floor(Math.random() * this.numOfVerses) + 1;

    this.verse = await this.verseService.getVerse(random);
    this.verseTranslation = await this.verseService.getVerseTranslation(random, this.translation);
    this.translationText = `(${this.verseTranslation.data.surah.number}:${this.verseTranslation.data.numberInSurah}) ${this.verseTranslation.data.text}`;
    this.isNew = false;
  }
}
