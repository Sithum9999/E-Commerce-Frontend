import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatCard } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [MatCard, MatDividerModule, NgFor, RouterLink, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title').value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
    console.log(this.products);
  }

deleteProduct(productId: any) {
  this.adminService.deleteProduct(productId).subscribe(res => {
    if (res == null || res.body == null) {
      this.snackBar.open('Product Deleted Successfully!', 'close', {
        duration: 5000
      });
      this.getAllProducts();
    } else {
      this.snackBar.open(res.message || 'Unexpected error', 'close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    }
  });
}


}