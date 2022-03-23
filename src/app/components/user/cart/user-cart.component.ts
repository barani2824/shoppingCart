import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Cart, CartProduct } from 'src/app/components/user/model/cart.model';
import { Product } from 'src/app/components/product/model/product.model';
import { User } from 'src/app/components/user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { MenuToggleService } from 'src/app/service/menu-toggle.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';
import { DialogService } from 'src/app/service/dialog.service';
import { BroadcastService } from 'src/app/service/broadcast/broadcast.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit, OnDestroy {

  cartUpdatedSubscription: Subscription;
  loggedInUser!: User | null;
  userCart!: Cart;
  cartItems!:CartProduct[];

  constructor(private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private menuToggleService: MenuToggleService,
    private dialog: DialogService,
    private broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.populateData();
    this.cartUpdatedSubscription = this.broadcastService.receiveMsg(Constants.CART_UPDATED, () => {
        this.populateData();
    });
  }

  ngOnDestroy(): void {
    this.cartUpdatedSubscription.unsubscribe();
    this.broadcastService.clearMsgByEvent(Constants.CART_UPDATED);
  }

  close(): void {
    this.menuToggleService.close();
  }

  populateData() {
    this.spinner.show();
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
      if (!!loggedInUser) {
        this.cartService.getUserCart(loggedInUser.id).subscribe((userCart) => {
          this.userCart = userCart;
          this.cartItems = userCart.products;
          this.broadcastService.publishMsg(Constants.CART_UPDATED_COUNT, userCart.products.length);
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

  yesNoDialog(product: CartProduct) {
      this.dialog
        .confirmDialog({
          title: 'Product',
          message: 'Do you want to delete ' + product.name + '?',
          confirmCaption: 'Yes',
          cancelCaption: 'No',
        })
        .subscribe((yes) => {
          if (yes)
              this.removeFromCart(product)
        });
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
