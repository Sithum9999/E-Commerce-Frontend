import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-wishlist.component.html',
  styleUrl: './view-wishlist.component.css'
})
export class ViewWishlistComponent {

    products: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getWishlistByUserId();
  }

  getWishlistByUserId(): void {
    this.customerService.getWishlistByUserId().subscribe((res: any[]) => { // Assuming res is an array
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
    });
  }


}
