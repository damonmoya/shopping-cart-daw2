import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductPanelComponent } from './components/product-panel/product-panel.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'products/panel', component: ProductPanelComponent },

  { path: '**', component: HomeComponent } // Wildcard Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
