import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product';
import { ShopService } from '../shop.service';
import{ Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.subscription = this.shopService.currentProducts.subscribe(products => this.products = products)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
