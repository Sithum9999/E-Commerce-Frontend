import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-ordered-products',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, NgFor],
  templateUrl: './view-ordered-products.component.html',
  styleUrl: './view-ordered-products.component.css'
})
export class ViewOrderedProductsComponent {

  orderId: any = this.activatedroute.snapshot.params['orderId'];
  orderedProductDetailsList: any[] = [];
  totalAmount: any;

  constructor(private activatedroute: ActivatedRoute,
    private customerService: CustomerService,) { }

  ngOnInit() {
    this.getOrderedProductsDetailsByOrderId();
  }

  getOrderedProductsDetailsByOrderId() {
    this.customerService.getOrderedProducts(this.orderId).subscribe(res => {
      res.productDtoList.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.orderedProductDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
    });
  }

}
