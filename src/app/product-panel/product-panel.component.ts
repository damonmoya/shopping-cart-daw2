import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../product/product';
import { Subscription } from 'rxjs';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent implements OnInit, AfterViewInit {

  products: Product[];
  subscription: Subscription;
  dataSource: any;

  constructor(private shopService: ShopService) { }
  
  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];

  @ViewChild(MatTable)
  table: MatTable<any>;

  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit(): void {
    this.subscription = this.shopService.currentProducts.subscribe(products => this.products = products)
    this.refreshTable()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshTable() {
    this.shopService.currentProducts.subscribe((products)=> {
      ​​​​​this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
    })
  }

}
