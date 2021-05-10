import { Injectable } from '@angular/core';
import { Product } from '../../components/product/product';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private store: AngularFirestore, private authService: AuthService) { 
  }

  //private products: Product[] = [
  //  { name: 'Camiseta azul', description: "Una camiseta azul básica", category: "Parte superior", image: "assets/imgs/camiseta-azul.jpg"},
  //  { name: 'Vaqueros azules', description: "Unos vaqueros azules clásicos", category: "Pantalones", image: "assets/imgs/vaqueros-azules.jpg"},
  //  { name: 'Zapatos de piel', description: "Unos zapatos de piel elegantes", category: "Calzado", image: "assets/imgs/zapatos-piel.jpg"},
  //  { name: 'Gorra negra', description: "Una gorra negra desenfadada", category: "Accesorios", image: "assets/imgs/gorra-negra.jpg"}
  //];

  products = this.store.collection('products').valueChanges({ idField: 'id' });

  purchases = this.store.collection('purchases').valueChanges();

  ////////////////////////////

  getDatabaseProducts() {
    return this.products
  }

  addProductToDatabase(product: Product) {
    this.store.collection('products').add(product);
  }

  removeProductFromDatabase(id: string){
    this.store.collection('products').doc(id).delete();
  }

  updateProductInDatabase(product: Product) {
    this.store.collection('products').doc(product.id).update(product);
  }

  //////////////////////////////

  getCartProducts() {
    const userCart = "cart_" + this.authService.currentUserId
    return this.store.collection(userCart).valueChanges({ idField: 'id' });
  }

  addProductToCart(product: Product) {
    const userCart = "cart_" + this.authService.currentUserId
    this.store.collection(userCart).add(product);
  }

  removeProductFromCart(id: string) {
    const userCart = "cart_" + this.authService.currentUserId
    this.store.collection(userCart).doc(id).delete();
  }

  /////////////////////////////

  confirmBuy(amount: number) {
    const userCart = "cart_" + this.authService.currentUserId
    const userProducts = this.store.collection(userCart).valueChanges({ idField: 'id' });

    let list = []
    let i = 1
    userProducts.subscribe((value) => value.forEach((element) => {
      list.push(element)
      if (value.length == i) {
        this.store.collection('purchases').add({ id: this.store.createId(), user: this.authService.currentUserId, amount: amount, products: list, date: new Date()});
        list.forEach(element => {
          this.removeProductFromCart(element.id)
        });
      }
      i = i + 1
    }
    ));
  }

  /////////////////////////////

  getUserPurchases() {
    return this.store.collection('purchases', ref => ref.where('user', '==', this.authService.currentUserId)).valueChanges();
  }

}
