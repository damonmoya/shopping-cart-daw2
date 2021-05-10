import { Component, OnInit } from '@angular/core';
import{ Subscription } from 'rxjs';
import { ShopService } from '../../services/shop/shop.service';
import { Product } from '../product/product';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products= [];
  total_price = 0;
  subscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private shopService: ShopService, private authService: AuthService, private _snackBar: MatSnackBar) { 
    this.subscription = this.shopService.getCartProducts().subscribe(products => {
      this.products = products

      this.total_price = 0
      this.products.forEach(element => {
        this.total_price += element.price
      });
    })
  }

  ngOnInit(): void {
  }

  removeFromCart(product: Product) {
    this.shopService.removeProductFromCart(product.id)
    const msg = product.name + " se ha eliminado del carrito"
    this.showAlert(msg)
  }

  confirmBuy() {

    this.shopService.confirmBuy(this.total_price)
  }

  showAlert(msg: string): void {
    this._snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
