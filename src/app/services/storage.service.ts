import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Product } from '../model/product';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  cart: Product[] = [];
  products: Product[] = JSON.parse(localStorage.getItem('products') as string);
  users: User[] = [
    { id: 1, email: 'yenugula@User.com', password: 'sravani12345' },
  ];

  loadUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') as string);
  }

  getRandomNumber(max = 1000): number {
    return Math.floor(Math.random() * max);
  }

  // creating user id

  getRandomId(): string {
    for (let i = 0; i < 10000; i++) {
      const randomId = this.getRandomNumber();

      const checkingId = this.products.find((obj) => obj.id === randomId);

      if (!checkingId) {
        let id: string = randomId.toString();

        return id;
      }
    }

    return '';
  }

  setAllUsers(registerForm: any) {
    console.log(registerForm.email);
    this.users.push({
      id: parseInt(this.getRandomId()),
      email: registerForm.email,
      password: registerForm.password,
    });
    console.log(this.users);
    
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem('LoggedInUser', JSON.stringify(user));
  }
  removeLoggedInUser(): void {
    localStorage.removeItem('LoggedInUser');
  }
  isUserLoggedIn(): boolean {
    return localStorage.getItem('LoggedInUser') !== null;
  }

  saveProducts(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getCachedProducts(): Product[] {
    return JSON.parse(localStorage.getItem('products') as string);
  }
}
