import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css'
})
export class CouponsComponent {

  coupons: any;

  constructor(private adminService: AdminService) { } 

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(): void {
    this.adminService.getCoupons().subscribe((res: any) => {
      this.coupons = res;
    });
  }

}
