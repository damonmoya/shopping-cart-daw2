import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products= [];
  subscription: Subscription;

  constructor(public authService: AuthService, public shopService: ShopService) { }

  ngOnInit(): void {
    this.subscription = this.shopService.getLatestProducts().subscribe(products => this.products = products)
  }

}
