import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product';
import { ShopService } from '../../services/shop/shop.service';
import{ Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products= [];
  subscription: Subscription;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.subscription = this.shopService.getDatabaseProducts().subscribe(products => this.products = products)
  }

}
