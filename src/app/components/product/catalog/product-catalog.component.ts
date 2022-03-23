import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/components/product/model/product.model';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/components/user/model/user.model';
import { Constants } from 'src/app/shared/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  isAddEdit = false;
  selectedProduct!: any;
  products!: Product[];
  resourcesLoaded = false;
  length = 1000;
  isSearchStarted = false;

  pageEvent: PageEvent = new PageEvent();

  searchText = '';
  loggedInUser!: User | null;

  constructor(private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: DialogService) {
    this.authService.getLoggedInUser().subscribe((_loggedInUser) => {
      this.loggedInUser = _loggedInUser;
    }, err => {

    })
  }

  ngOnInit(): void {
    this.spinner.show();
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.length = this.products.length;
      this.pageEvent.length = this.length;
      this.pageEvent.pageIndex = 0;
      this.resourcesLoaded = true;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  public searchProducts = (target: any) => {
    setTimeout(() => {
        if (this.isSearchStarted)
            return;
        this.resourcesLoaded = false;
        this.spinner.show();
        this.productService.searchProducts(target.value.trim()
          .toLocaleLowerCase()).subscribe((searchedProducts) => {
            this.products = searchedProducts;
            this.pageEvent.length = this.products.length;
            this.pageEvent.pageIndex = 0;
            this.length = this.products.length;
            this.resourcesLoaded = true;
            this.spinner.hide();
            this.isSearchStarted = false;
          }, err => {
            this.spinner.hide();
            this.isSearchStarted = false;
          })
        this.isSearchStarted = true;
    }, 1000)
  }

  add(product: Product) {
    this.productService.add(product, this.cartService);
  }

  isLoggedInUserAdmin() {
    return this.loggedInUser != null && this.loggedInUser.role == Constants.ROLE_ADMIN;
  }

  yesNoDialog(product: Product) {
    this.dialog
      .confirmDialog({
        title: 'Product',
        message: 'Do you want to delete ' + product.name + '?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes)
            this.delete(product)
      });
  }

  delete(product: Product) {
    this.productService.delete(product);
  }

  addEditProduct(product?: any) {
    if (product)
        this.selectedProduct = product;
    else
        this.selectedProduct = null;
    this.isAddEdit = true;
  }

  cancelEmitter(event: any) {
    this.isAddEdit = false;
  }

}


