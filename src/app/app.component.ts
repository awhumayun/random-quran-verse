import { Component } from '@angular/core';
import { Verse } from './interfaces/verse';
import { VerseService } from './services/verse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'randomquranverse';

  constructor(private verseService: VerseService) { }

  ngOnInit() { }
}
