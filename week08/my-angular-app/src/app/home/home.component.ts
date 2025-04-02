import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,  // Mark as standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Home Component';
}
