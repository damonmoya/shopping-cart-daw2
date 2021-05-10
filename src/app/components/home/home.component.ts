import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShopService } from 'src/app/services/shop/shop.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products= [];
  subscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public authService: AuthService, private router: Router, public shopService: ShopService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscription = this.shopService.getLatestProducts().subscribe(products => this.products = products)
  }

  addToCart(product: Product){
    if (!this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      product.user = this.authService.currentUserId
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
