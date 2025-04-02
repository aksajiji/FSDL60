import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing in standalone component

@Component({
  selector: 'app-root',
  standalone: true,  // Mark as a standalone component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]  // Import RouterModule here for routing functionality
})
export class AppComponent {
  title = 'Angular App';
}
