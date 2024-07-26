import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Translation } from "../interfaces/translation";
import { Verse } from "../interfaces/verse";
import { BASE_URL } from "../constants/api";

@Injectable({
  providedIn: "root",
})
export class VerseService {
  constructor(private httpClient: HttpClient) {}

  getVerse(number: number): Observable<Verse> {
    const url: string = `${BASE_URL}/${number}`;
    return this.httpClient
      .get<Verse>(url)
      .pipe(catchError(this.handleError<Verse>("getVerse")));
  }

  getVerseTranslation(
    number: number,
    translation: Translation
  ): Observable<Verse> {
    const url: string = `${BASE_URL}/${number}/${translation.id}`;
    return this.httpClient
      .get<Verse>(url)
      .pipe(catchError(this.handleError<Verse>("getVerseTranslation")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
