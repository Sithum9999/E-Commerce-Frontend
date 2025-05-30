import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(Category: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', Category, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/product', product, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateProduct(productId: any, product: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/product/${productId}`, product, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/coupons', coupon, {
      headers: this.createAuthorizationHeader(),
    });
  }


  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCoupons(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/coupons', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getPlacedOrders(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/placedOrders', {
      headers: this.createAuthorizationHeader(),
    });
  }

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/order/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  postFAQ(productId: number, faq: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/admin/faq/${productId}`, faq, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAnalytics(): Observable<any> {
  return this.http.get(BASIC_URL + 'api/admin/order/analytics', {
    headers: this.createAuthorizationHeader(),
  });
}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }
}
