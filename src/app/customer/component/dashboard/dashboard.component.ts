import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'customer-dashboard',
  standalone: true,
  imports: [MatCard, MatDividerModule, NgFor, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    products: any[] = [];
    searchProductForm: FormGroup;
  
    constructor(private customerService: CustomerService, private fb: FormBuilder, private snackBar: MatSnackBar) { }
  
    ngOnInit() {
      this.getAllProducts();
      this.searchProductForm = this.fb.group({
        title: [null, [Validators.required]]
      })
    }
  
    getAllProducts() {
      this.products = [];
      this.customerService.getAllProducts().subscribe(res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      });
    }
  
    submitForm() {
      this.products = [];
      const title = this.searchProductForm.get('title').value;
      this.customerService.getAllProductsByName(title).subscribe(res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      });
      console.log(this.products);
    }

    addToCart(id:any){

    }

}
