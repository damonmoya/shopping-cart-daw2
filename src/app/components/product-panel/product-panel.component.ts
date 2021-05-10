import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../product/product';
import { Subscription } from 'rxjs';
import { ShopService } from '../../services/shop/shop.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent, ProductDialogResult } from '../product-dialog/product-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent implements OnInit, AfterViewInit {

  subscription: Subscription;
  products: any[]
  dataSource = new MatTableDataSource();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private shopService: ShopService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.shopService.getDatabaseProducts().subscribe( (products) => {
      ​​​​​this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
    })
   }
  
  displayedColumns: string[] = ['name', 'description', 'price', 'image', 'actions'];

  @ViewChild(MatTable)
  table: MatTable<any>;

  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit(): void {
    this.refreshTable()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  refreshTable() {
    this.shopService.getDatabaseProducts().subscribe( (products) => {
      ​​​​​this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
    })
  }

  newProduct(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      disableClose: true,
      width: '270px',
      data: {
        product: { user: '', name: '', price: '', description: '', image: '',},
        creating: true
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((result: ProductDialogResult) => {
        if (!result.cancel) {
          this.shopService.addProductToDatabase(result.product)
          const msg = "Producto '" + result.product.name + "' creado";
          this.showAlert(msg);
        }
      })
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      disableClose: true,
      width: '270px',
      data: {
        product,
        deleting: true
      }
    });
    dialogRef.afterClosed().subscribe((result: ProductDialogResult) => {
      if (!result.cancel) {
        this.shopService.removeProductFromDatabase(product.id)
        const msg = "Producto '" + product.name + "' eliminado";
        this.showAlert(msg);
      }  
    })
  }

  editProduct(product: Product, list: string): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      disableClose: true,
      width: '270px',
      data: {
        product,
        editing: true,
        original_name: product.name
      }
    });
    dialogRef.afterClosed().subscribe((result: ProductDialogResult) => {
      if (!result.cancel) {
        this.shopService.updateProductInDatabase(product)
        const msg = "Producto '" + result.product.name + "' editado";
        this.showAlert(msg);
      }  
    })
    this.refreshTable();
  }

  showAlert(msg: string): void {
    this._snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
