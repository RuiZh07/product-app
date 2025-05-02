import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'data/products.json';

  constructor(private http: HttpClient) { }

  // Fetch product data from the server
  getProducts(): Observable<Product []> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // Fetch a specific product by its ID from the list of products
  getProductById(id: number): Observable<Product | undefined> {
    return new Observable((observer) => {
      this.getProducts().subscribe((products) => {
        observer.next(products.find(p => p.id === id));
        observer.complete();
      });
    });
  }
}
