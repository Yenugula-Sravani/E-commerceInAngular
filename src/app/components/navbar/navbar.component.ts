import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  count: number =0;
  logout(): void {
    return this.authService.logout();
  }

  getCount(): number {
    return this.cartService.getCartCount();
  }
}
