import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [
    { name: 'Camiseta azul', description: "Una camiseta azul básica", category: "Parte superior", image: "assets/imgs/camiseta-azul.jpg"},
    { name: 'Vaqueros azules', description: "Unos vaqueros azules clásicos", category: "Pantalones", image: "assets/imgs/vaqueros-azules.jpg"},
    { name: 'Zapatos de piel', description: "Unos zapatos de piel elegantes", category: "Calzado", image: "assets/imgs/zapatos-piel.jpg"},
    { name: 'Gorra negra', description: "Una gorra negra desenfadada", category: "Accesorios", image: "assets/imgs/gorra-negra.jpg"}
  ];

  @Input() product: Product;
  @Output() edit = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
