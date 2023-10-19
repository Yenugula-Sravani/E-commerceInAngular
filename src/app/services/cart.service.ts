import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from './product.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];
  total: number = 0;
  

  constructor(private storageService: StorageService) {}

  getCartCount(): number {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart')!);
    let count: number = 0;

    for (let c of cart) {
       count += c.count!;
    }
    return count;
  }

  addToCart(id: number,activeUser:number) {

    let cart: Product[] = JSON.parse(localStorage.getItem('cart')!);
    let products: Product[] = this.storageService.getCachedProducts();

    let product: Product | undefined = products.find((p) => p.id === id);

    if (product) {
      let cartProduct: Product | undefined = cart.find(
        (c) => c.id === product?.id
      );

      if (cartProduct) {
        let newCart: Product[] = [];
        for (let product of cart) {
          if (product.id === id) {
            newCart.push({ ...product, count: product.count! + 1,userId:activeUser });
          } else {
            newCart.push(product);
          }
        }
        cart = newCart;
      } else {
        cart.push({ ...product, count: 1,userId:activeUser });
      }
    }

    console.log(cart);
    
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCartProducts(): Product[] {
    return this.cart;
  }

  checkOut() {
    localStorage.removeItem('cart');
  }

  //geting total value on cart page

  getTotalValue(): number {
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    let totalPrice = this.cart.map((val) => val.price * val.count!);
    this.total = totalPrice.reduce((sum, curr) => sum + curr, 0);
    return Math.floor(this.total);
  }
}
