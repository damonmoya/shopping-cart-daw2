import { Injectable } from '@angular/core';
import { Product } from '../../components/product/product';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private store: AngularFirestore, private db: AngularFireDatabase) { 
  }

  //private products: Product[] = [
  //  { name: 'Camiseta azul', description: "Una camiseta azul básica", category: "Parte superior", image: "assets/imgs/camiseta-azul.jpg"},
  //  { name: 'Vaqueros azules', description: "Unos vaqueros azules clásicos", category: "Pantalones", image: "assets/imgs/vaqueros-azules.jpg"},
  //  { name: 'Zapatos de piel', description: "Unos zapatos de piel elegantes", category: "Calzado", image: "assets/imgs/zapatos-piel.jpg"},
  //  { name: 'Gorra negra', description: "Una gorra negra desenfadada", category: "Accesorios", image: "assets/imgs/gorra-negra.jpg"}
  //];

  products = this.store.collection('products').valueChanges({ idField: 'id' });

  cart = this.store.collection('cart').valueChanges({ idField: 'id' });

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
    return this.products
  }

  addProductToCart(product: Product) {
    this.store.collection('cart').add(product);
  }

  removeProductFromCart(id: string) {
    this.store.collection('cart').doc(id).delete();
  }

}
