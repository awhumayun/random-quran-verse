import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-random-verse-button",
  templateUrl: "./random-verse-button.component.html",
  styleUrl: "./random-verse-button.component.scss",
  encapsulation: ViewEncapsulation.Emulated,
})
export class RandomVerseButtonComponent {
  @Input() disabled: boolean = false;
  @Output() buttonClicked = new EventEmitter<void>();

  isButtonActive: boolean = false;

  activateButton(): void {
    this.isButtonActive = true;
  }

  deactivateButton(): void {
    this.isButtonActive = false;
  }

  onClick(): void {
    if (!this.disabled) {
      this.buttonClicked.emit();
    }
  }

  onTouchEnd(): void {
    this.deactivateButton();
    this.onClick();
  }
}
