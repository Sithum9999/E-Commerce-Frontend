import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { OrderByStatusComponent } from './order-by-status/order-by-status.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MatCardModule, CommonModule, OrderByStatusComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  data:any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAnalytics().subscribe(res => {
      console.log(res);
      this.data=res;
    })
  }

}
