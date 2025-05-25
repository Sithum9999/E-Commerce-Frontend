import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatMenuModule, MatButtonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: any;

  constructor(private adminService: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPlacedOrders();
  }

  getPlacedOrders() {
    this.adminService.getPlacedOrders().subscribe(res => {
      this.orders = res;
    });
  }

  changeOrderStatus(orderId: number, status: string) {
  this.adminService.changeOrderStatus(orderId, status).subscribe(res => {
    if (res.id != null) {
      this.snackBar.open("Order status changed successfully", "Close", {
        duration: 5000
      });
      this.getPlacedOrders();
    } else {
      this.snackBar.open("Something went wrong", "Close", {
        duration: 5000
      });
    }
  });
}

}
