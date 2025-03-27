import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  onRouteChange(event: any) {
    // التحقق إذا كان الـ Component الحالي هو HomeComponent
    this.isHomePage = event.constructor.name === "HomeComponent";
  }
}
