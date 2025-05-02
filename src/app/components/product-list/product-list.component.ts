import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private productService: ProductService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the list of products from the service
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data ?? [];
      },
      error: (error) => {
        console.error('Error fetching products: ', error);
      }
    });
  }
  // Navigate to the product detail page by product ID
  onViewDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
