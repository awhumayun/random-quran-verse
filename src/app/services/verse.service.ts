import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Translation } from "../interfaces/translation";
import { Verse } from "../interfaces/verse";

@Injectable({
  providedIn: "root",
})
export class VerseService {
  baseUrl: string = "https://api.alquran.cloud/v1/ayah";

  constructor(private httpClient: HttpClient) {}

  async getVerse(number: number): Promise<Verse> {
    const url: string = `${this.baseUrl}/${number}`;
    return this.getVerseFromUrl(url);
  }

  async getVerseTranslation(
    number: number,
    translation: Translation
  ): Promise<Verse> {
    const url: string = `${this.baseUrl}/${number}/${translation.id}`;
    return this.getVerseFromUrl(url);
  }

  async getVerseFromUrl(url: string): Promise<Verse> {
    let verse: Verse = {
      code: 0,
      status: "",
      data: {
        numberInSurah: 0,
        text: "",
        surah: {
          number: 0,
        },
      },
    };

    await this.httpClient
      .get<Verse>(url)
      .toPromise()
      .then((data) => (verse = data));

    return verse;
  }
}
