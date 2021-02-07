import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  insertProducts(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (title) updateProduct.title = title;
    if (desc) updateProduct.description = desc;
    if (price) updateProduct.price = price;

    this.products[index] = { ...product };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id == id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('could found the product');
    }
    return [product, productIndex];
  }
}
