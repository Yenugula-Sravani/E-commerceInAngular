import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  activeUser:User=JSON.parse(localStorage.getItem("LoggedInUser")!);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
      
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        // console.log(data);
        this.products = data;
        this.storageService.saveProducts(this.products);
      },
      complete: () => {
        console.log('products loaded completed');
      },
      error: (error: Error) => {
        console.log('Message', error.message);
        console.log('Name', error.name);
      },
    });
  }
  addToCart(id: number, activeUser:number ) {
    console.log('cart added');
    this.cartService.addToCart(id,activeUser);
  }
}
