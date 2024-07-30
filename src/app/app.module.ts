import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { AppComponent } from "./app.component";
import { VerseService } from "./services/verse.service";
import { HeaderComponent } from "./components/header/header.component";
import { DarkModeToggleComponent } from "./components/dark-mode-toggle/dark-mode-toggle.component";
import { RandomVerseButtonComponent } from "./components/random-verse-button/random-verse-button.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DarkModeToggleComponent,
    RandomVerseButtonComponent,
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FontAwesomeModule],
  providers: [VerseService, provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
