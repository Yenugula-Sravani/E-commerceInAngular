import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit{
  cart:Product[]=JSON.parse(localStorage.getItem("cart")!);
  cartProducts:Product[]=[];
  constructor(private cartService :CartService){
  }
  ngOnInit(): void {
    this.cartProducts=this.cartService.getCartProducts();
  }

  checkOut(){
    this.cartService.checkOut();
  }

  total:number=this.cartService.returnTotal();

}
