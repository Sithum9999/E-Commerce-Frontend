import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatCard } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [MatCard,MatDividerModule,NgFor,RouterLink,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

products: any[] = [];

constructor(private adminService: AdminService) {}

ngOnInit() {
  this.getAllProducts();
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


}
