import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) { }

  ngOnInit(): void {
  }

}

export interface ProductDialogData {
  product: Product;
  creating: boolean;
  editing: boolean;
  deleting: boolean;
  product_title: string;
}

export interface ProductDialogResult {
  cancel: any;
  product: Product;
  delete?: boolean;
}
