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
  title = 'randomquranverse';

  numOfVerses = 6236;
  
  verse!: Verse;
  verseTranslation!: Verse;
  translation = TRANSLATIONS[6];

  constructor(private verseService: VerseService) { }

  async ngOnInit() { 
    await this.getRandomVerse();
  }

  async getRandomVerse(): Promise<void> {
    const random = Math.floor(Math.random() * this.numOfVerses) + 1;

    this.verse = await this.verseService.getVerse(random);
    this.verseTranslation = await this.verseService.getVerseTranslation(random, this.translation);
  }
}
