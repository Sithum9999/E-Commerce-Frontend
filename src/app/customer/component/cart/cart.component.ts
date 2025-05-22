import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../service/customer.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, MatButtonModule, NgFor, NgIf, MatInputModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  couponForm: FormGroup;

  constructor(private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    });

    this.getCart();
  }

  applyCoupon() {
    this.customerService.applyCoupon(this.couponForm.get('code')!.value).subscribe(res => {
      this.snackbar.open("Coupon Applied Successfully", 'Close', {
        duration: 5000
      });
      this.getCart();
    }, error => {
      this.snackbar.open(error.error, 'Close', {
        duration: 5000
      });
    });
  }

  getCart() {
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(res => {
      console.log(res);

      this.order = res;
      res.cartItems.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      });
    });
  }

  increaseQuantity(productId: any) {
    this.customerService.increaseProductQuantity(productId).subscribe((res: any) => {
      this.snackbar.open('Product quantity increased.', 'Close', { duration: 5000 });
      this.getCart();
    });
  }

}
