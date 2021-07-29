import { Injectable } from '@angular/core';
import { Translation } from '../classes/translation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Verse } from '../interfaces/verse';

@Injectable({
  providedIn: 'root'
})
export class VerseService {

  baseUrl: string = 'http://api.alquran.cloud/v1/ayah';

  constructor(private httpClient: HttpClient) { }

  async getVerse(number: number): Promise<Verse> {
    const url: string = `${this.baseUrl}/${number}`;
    return this.getVerseFromUrl(url);
  }

  async getVerseTranslation(number: number, translation: Translation): Promise<Verse> {
    const url: string = `${this.baseUrl}/${number}/${translation.id}`;
    return this.getVerseFromUrl(url);
  }

  async getVerseFromUrl(url: string): Promise<Verse> {
    let verse: Verse = { code: 0, status: '', data: '' };
    await this.httpClient.get<Verse>(url).toPromise().then(data => verse = data);

    return verse;
  }
}
