import { Component, OnInit, Input } from '@angular/core';
import { Cart, CartProduct } from 'src/app/components/user/model/cart.model';
import { Product } from 'src/app/components/product/model/product.model';
import { User } from 'src/app/components/user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';

import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  @Input() public drawer: any;
  loggedInUser!: User | null;
  userCart!: Cart;
  cartItems!:CartProduct[];

  constructor(private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.spinner.show();
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
      if (!!loggedInUser) {
        this.cartService.getUserCart(loggedInUser.id).subscribe((userCart) => {
          this.userCart = userCart;
          this.cartItems = userCart.products;
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
        });
      }
    }, err => {
      this.spinner.hide();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  getTotalCost() {
    return this.cartItems.map(t => t.price * t.quantity)
      .reduce((acc, value) => acc + value, 0);
  }

  getPrice(product: Product) {
    return product.price * product.quantity;
  }

  clearCart() {
    this.cartService.clearCart();
    this.populateData();
  }

  removeFromCart(product: any) {
    let productName = product.name;
    this.cartService.removeFromCart(product.id).subscribe((observable) => {
      observable.subscribe((status) => {
        if (status != null) {
          this.populateData();
        }
      }, err => {
        this.spinner.hide();
      });
    }, err => {
      this.spinner.hide();
    });
  }

}
