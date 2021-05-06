import { Component, OnInit } from '@angular/core';
import{ Subscription } from 'rxjs';
import { ShopService } from '../../services/shop/shop.service';
import { Product } from '../product/product';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products= [];
  subscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private shopService: ShopService, private _snackBar: MatSnackBar) { 
    this.subscription = this.shopService.cart.subscribe(products => this.products = products)
  }

  ngOnInit(): void {
  }

  removeFromCart(product: Product) {
    this.shopService.removeProductFromCart(product.id)
    const msg = product.name + " se ha eliminado del carrito"
    this.showAlert(msg)
  }

  showAlert(msg: string): void {
    this._snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
