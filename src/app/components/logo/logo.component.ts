import { Component } from '@angular/core';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent {
  faCirclePlay = faCirclePlay;
}
