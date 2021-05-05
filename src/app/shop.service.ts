import { Injectable } from '@angular/core';
import { Product } from './product/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private products: Product[] = [
    { name: 'Camiseta azul', description: "Una camiseta azul básica", category: "Parte superior", image: "assets/imgs/camiseta-azul.jpg"},
    { name: 'Vaqueros azules', description: "Unos vaqueros azules clásicos", category: "Pantalones", image: "assets/imgs/vaqueros-azules.jpg"},
    { name: 'Zapatos de piel', description: "Unos zapatos de piel elegantes", category: "Calzado", image: "assets/imgs/zapatos-piel.jpg"},
    { name: 'Gorra negra', description: "Una gorra negra desenfadada", category: "Accesorios", image: "assets/imgs/gorra-negra.jpg"}
  ];

  private productSource = new BehaviorSubject(this.products)
  currentProducts = this.productSource.asObservable();

  getProducts() {
    return this.currentProducts;
  }

  constructor() { }
}
