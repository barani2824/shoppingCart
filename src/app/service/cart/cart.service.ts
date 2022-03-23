import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Cart, CartProduct } from '../../components/user/model/cart.model';
import { modules } from 'src/config/module';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product/product.service';
import { Constants } from '../../shared/constants';
import { User } from 'src/app/components/user/model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private productService: ProductService, private router: Router) { }

  getUserCart(userId: number | null): Observable<Cart> {
    return this.http.get<Cart>(environment.baseUrl + modules.cart.detail
      .replace(Constants.USER_ROUTE_PARAM_USER_ID, JSON.stringify(userId))).pipe(
        map((userCart: Cart) => {
          return this.populateCartData(userCart);
        })
      );
  }

  addToCart(productId: number) {
    let user: User = JSON.parse(localStorage.getItem(Constants.LOGGED_IN_USER)!);
    let added: boolean = false;

    let updatedCart: Cart;

    return this.getUserCart(user.id).pipe(
      map((cart: Cart) => {

        updatedCart = cart;
        if (updatedCart === undefined) {
          updatedCart = new Cart();
          updatedCart.id = user.id;
          updatedCart.products = [];
          let productToPush: CartProduct = new CartProduct();
          productToPush.id = productId;
          productToPush.quantity = 1;
          updatedCart.products.push(productToPush);
          added = true;

          return this.createCart(updatedCart).pipe(map(() => {
            return cart;
          }));
        }

        else {

          updatedCart.products.some((productFromCart) => {
            if (productFromCart.id == productId) {
              productFromCart.quantity = productFromCart.quantity + 1;
              added = true;
              return;
            }
          });
          if (!added) {
            let productToPush: CartProduct = new CartProduct();
            productToPush.id = productId;
            productToPush.quantity = 1;
            updatedCart.products.push(productToPush);
            added = true;
          };
          return this.updateCart(user.id, updatedCart).pipe(map(() => {
            return cart;
          }));
        }
      }));
  }

  removeFromCart(productId: number): Observable<Observable<Cart>> {
    let user: User = JSON.parse(localStorage.getItem(Constants.LOGGED_IN_USER)!);

    return this.getUserCart(user.id).pipe(
      map((cart: Cart) => {
        cart.products.splice(cart.products.findIndex(_product => _product.id === productId), 1);
        return this.updateCart(user.id, cart);
      }, () => {
        return null;
      }));
  }

  private populateCartData(cart: Cart): Cart {
    cart.products.forEach(product => {
      this.productService.getProductById(product.id).subscribe((productData) => {
        product.name = productData.name;
        product.price = productData.price;
        product.discount = productData.discount;
      }, err => {
      })
    });
    return cart;
  }

  private createCart(cart: Cart): Observable<void> {
    return this.http.post<void>(
      environment.baseUrl + modules.cart.list,
      cart
    );
  }

  private updateCart(userId: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(environment.baseUrl + modules.cart.detail
      .replace(Constants.USER_ROUTE_PARAM_USER_ID, JSON.stringify(userId)), cart
    );
  }

  clearCart() {
    let user: User = JSON.parse(localStorage.getItem(Constants.LOGGED_IN_USER)!);
    this.http.delete<void>(environment.baseUrl + modules.cart.detail
      .replace(Constants.USER_ROUTE_PARAM_USER_ID, JSON.stringify(user.id))).subscribe((status) => {
        status;
      }, err => {
      });
  }
}
