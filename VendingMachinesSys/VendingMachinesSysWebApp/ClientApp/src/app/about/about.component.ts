import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  isPopupVisible = false;
  selectedPopup = '';

  openPopup(popup: string) {
    this.isPopupVisible = true;
    this.selectedPopup = popup;
  }

  closePopup() {
    this.isPopupVisible = false;
    this.selectedPopup = '';
  }
}
