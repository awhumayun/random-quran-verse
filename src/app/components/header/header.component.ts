import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  logo = {
    bold: "Random",
    text: " Quran Verse",
  };

  isOnMobile: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.setMobile();
  }

  setMobile(): void {
    if (screen.width <= 600) {
      this.isOnMobile = true;

      this.logo.bold = "R";
      this.logo.text = "QV";
    }
  }
}
