import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false,
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;
  totalProducts = 0;
  currentPage = 0;
  pageSize = 10;
  Math = Math;

  // Form data
  newProduct: Product = {
    name: '',
    price: 0,
    category: '',
    colors: [],
    designer: '',
    image: '',
    isFeatured: false,
    description: ''
  };
  editingProduct: Product | null = null;
  colorInput = '';

  // Helper method to get the active product (either editing or new)
  get activeProduct(): Product {
    return this.editingProduct || this.newProduct;
  }

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    this.productService.getAllProducts(this.pageSize, this.currentPage * this.pageSize)
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.totalProducts = response.count;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load products';
          this.loading = false;
        }
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  addColor() {
    if (this.colorInput.trim()) {
      this.activeProduct.colors.push(this.colorInput.trim());
      this.colorInput = '';
    }
  }

  removeColor(index: number) {
    this.activeProduct.colors.splice(index, 1);
  }

  submitProduct() {
    if (!this.validateProduct()) {
      return;
    }

    this.loading = true;
    if (this.editingProduct && this.editingProduct._id) {
      // Update existing product
      this.productService.updateProduct(this.editingProduct._id, this.editingProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
          this.error = null;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to update product';
          this.loading = false;
        }
      });
    } else {
      // Create new product
      this.productService.createProduct(this.newProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
          this.error = null;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to create product';
          this.loading = false;
        }
      });
    }
  }

  private validateProduct(): boolean {
    if (!this.activeProduct.name?.trim()) {
      this.error = 'Product name is required';
      return false;
    }
    if (!this.activeProduct.description?.trim()) {
      this.error = 'Product description is required';
      return false;
    }
    if (!this.activeProduct.price || this.activeProduct.price <= 0) {
      this.error = 'Product price must be greater than 0';
      return false;
    }
    if (!this.activeProduct.category?.trim()) {
      this.error = 'Product category is required';
      return false;
    }
    if (!this.activeProduct.designer?.trim()) {
      this.error = 'Product designer is required';
      return false;
    }

    return true;
  }

  editProduct(product: Product) {
    // Create a deep copy of the product to avoid modifying the original
    this.editingProduct = JSON.parse(JSON.stringify(product));
    // Reset error state when starting to edit
    this.error = null;
  }

  deleteProduct(productId: string | undefined) {
    if (!productId) {
      this.error = 'Cannot delete product: ID is missing';
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          this.error = err.message || 'Failed to delete product';
        }
      });
    }
  }

  resetForm() {
    this.newProduct = {
      name: '',
      price: 0,
      category: '',
      colors: [],
      designer: '',
      image: '',
      isFeatured: false,
      description: ''
    };
    this.editingProduct = null;
    this.colorInput = '';
  }

  cancelEdit() {
    this.editingProduct = null;
    this.error = null;
    this.colorInput = '';
    this.resetForm();
  }
}
