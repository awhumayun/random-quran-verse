import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { VerseService } from "./services/verse.service";
import { HeaderComponent } from "./components/header/header.component";
import { ButtonComponent } from "./components/button/button.component";
import { DarkModeToggleComponent } from "./components/dark-mode-toggle/dark-mode-toggle.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    DarkModeToggleComponent,
  ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [VerseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
