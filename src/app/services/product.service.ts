import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getAllProducts() {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products');
  }

  saveProducts(products: Product[]) {
    this.storageService.saveProducts(products);
  }
}
