import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId: any): Observable<any> {
    const cart = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };

    return this.http.post(BASIC_URL + 'api/customer/cart', cart, {
      headers: this.createAuthorizationHeader()
    });
  }

  increaseProductQuantity(productId: any): Observable<any> {
    const cart = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };

    return this.http.post(BASIC_URL + 'api/customer/addition', cart, {
      headers: this.createAuthorizationHeader(),
    });
  }

  decreaseProductQuantity(productId: any): Observable<any> {
    const cart = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };

    return this.http.post(BASIC_URL + 'api/customer/deduction', cart, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  applyCoupon(code: any): Observable<any> {
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `api/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  placeOrder(Order: any): Observable<any> {
    Order.userId = UserStorageService.getUserId()
    return this.http.post(BASIC_URL + 'api/customer/placeOrder', Order, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `api/customer/myOrders/${userId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrderedProducts(orderId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/ordered-products/${orderId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

giveReview(Review: any): Observable<any> {
  return this.http.post(BASIC_URL + 'api/customer/review', Review, {
    headers: this.createAuthorizationHeader(),
  });
}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }

}
