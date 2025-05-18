import { Component} from '@angular/core';
import { FormBuilder, FormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../service/customer.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,MatIconModule, FormsModule, MatButtonModule, NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  constructor(private customerService: CustomerService, 
              private snackbar: MatSnackBar, 
              private fb: FormBuilder, 
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getCart();
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

}
