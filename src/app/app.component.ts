import { Component } from '@angular/core';
import { Verse } from './interfaces/verse';
import { TRANSLATIONS } from '../app/classes/translation-data';
import { VerseService } from './services/verse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numOfVerses = 6236;
  
  verse!: Verse;
  verseTranslation!: Verse;
  translationText!: string;

  translation = TRANSLATIONS[6];

  constructor(private verseService: VerseService) { }

  async ngOnInit() { 
    await this.getRandomVerse();
    this.setTranslationText();
  }

  async getRandomVerse(): Promise<void> {
    const random = Math.floor(Math.random() * this.numOfVerses) + 1;

    this.verse = await this.verseService.getVerse(random);
    this.verseTranslation = await this.verseService.getVerseTranslation(random, this.translation);
  }

  setTranslationText() {
    this.translationText = `(${this.verseTranslation.data.surah.number}:${this.verseTranslation.data.numberInSurah}) ${this.verseTranslation.data.text}`;
  }
}
