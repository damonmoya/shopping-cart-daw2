import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product';
import { ShopService } from '../../services/shop/shop.service';
import{ Observable, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products= [];
  subscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private shopService: ShopService, public authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscription = this.shopService.getDatabaseProducts().subscribe(products => this.products = products)
  }

  addToCart(product: Product){
    if (!this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.shopService.addProductToCart(product)
      const msg = product.name + " se ha añadido al carrito"
      this.showAlert(msg)
    }
  }

  showAlert(msg: string): void {
    this._snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
