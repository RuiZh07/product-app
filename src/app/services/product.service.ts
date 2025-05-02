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

  // Simulate async data fetching from a server
  getProducts(): Observable<Product []> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new Observable((observer) => {
      this.getProducts().subscribe((products) => {
        observer.next(products.find(p => p.id === id));
        observer.complete();
      });
    });
  }
}
