import { Component, ElementRef, Input, HostListener, input } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogin=input<boolean>(true)
  @Input() isHomeNavbar: boolean = false;
  // isLogin = true;
  cartNumber!: number;
  isTransparent: boolean = true;
  private heroSectionHeight: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeNavbar = event.url === '/home';
        if (this.isHomeNavbar) {
          setTimeout(() => this.updateHeroSectionHeight(), 100); // تحديث ارتفاع السيكشن بعد التحميل
        }
      }
    });

    this.cartService.cartNumber.subscribe({
      next: (res) => {
        this.cartNumber = res;
      },
    });
  }

  private updateHeroSectionHeight() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      this.heroSectionHeight = heroSection.clientHeight;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isHomeNavbar) {
      this.isTransparent = false;
      return;
    }

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isTransparent = scrollPosition < this.heroSectionHeight;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logoutUser();
  }
}




// import { Component, ElementRef, inject, Input, input, OnInit } from '@angular/core';
// import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
// import { AuthService } from '../../core/services/auth/auth.service';
// import { CartService } from '../../core/services/cart/cart.service';
// import { HostListener } from '@angular/core';
// import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
// import { NgClass } from '@angular/common';

// @Component({
//   selector: 'app-navbar',
//   imports:  [ RouterLink, RouterLinkActive , NgClass],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.scss'
// })
// export class NavbarComponent {
//   isLogin=input<boolean>(true)
//   cartNumber!:number
//   @Input() isHomeNavbar: boolean = false;
//   isTransparent: boolean = true;
//   private heroSectionHeight: number = 0;
// constructor (private cartService:CartService , private authService:AuthService ,private router: Router,private elRef: ElementRef){
//   this.router.events.subscribe(event => {
//     if (event instanceof NavigationEnd) {
//       this.isHomeNavbar = event.url === '/home'; // تحقق إذا كان المستخدم في الصفحة الرئيسية
//     }
//   });

//   this.cartService.cartNumber.subscribe({
//         next:(res)=>{
//           this.cartNumber = res
//         }
//       })
// }

// @HostListener('window:scroll', [])
// onWindowScroll() {
//   if (!this.isHomeNavbar) {
//     this.isTransparent = false;
//     return;
//   }
  
//   const scrollPosition = window.scrollY || document.documentElement.scrollTop;
//   this.isTransparent = scrollPosition < 100;
// }

// isActiveRoute(route: string): boolean {
//   return this.router.url === route;
// }
// logout():void{
//   this.authService.logoutUser()
// }
 
// // ngOnInit(): void {
// //   this.cartService.cartNumber.subscribe({
// //     next:(res)=>{
// //       this.cartNumber = res
// //     }
// //   })
// // }

// }
