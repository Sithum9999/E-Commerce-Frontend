import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatCardModule, NgIf, MatInputModule, CommonModule, FormsModule, MatButtonModule,  NgIf],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {

  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    });
  }

  placeOrder() {
    this.customerService.placeOrder(this.orderForm.value).subscribe(res => {
      if (res.id != null) {
        this.snackBar.open("Order placed successfully", "Close", { duration: 5000 })
        this.router.navigateByUrl("/customer/my_orders");
        this.closeForm();
      } else {
        this.snackBar.open("Something went wrong", "Close", { duration: 5000 })
      }
    });
  }

  closeForm(){
    this.dialog.closeAll();
  }

}
