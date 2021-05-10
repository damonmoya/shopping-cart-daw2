import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShopService } from 'src/app/services/shop/shop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  purchases= [];
  dataSource = new MatTableDataSource();
  subscription: Subscription;

  constructor(public authService: AuthService, public shopService: ShopService) {
    this.subscription = this.shopService.getUserPurchases().subscribe(purchases => {
      this.dataSource = new MatTableDataSource(purchases);
      this.dataSource.sort = this.sort;
    })
  }

  displayedColumns: string[] = ['id', 'amount', 'products', 'date'];

  @ViewChild(MatTable)
  table: MatTable<any>;

  @ViewChild(MatSort)
  sort: MatSort;
  
  ngOnInit(): void {
    this.refreshTable()
  }

  refreshTable() {
    this.shopService.getUserPurchases().subscribe(purchases => {
      this.dataSource = new MatTableDataSource(purchases);
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
