import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, MatCardModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent {

  searchOrderForm: FormGroup;
  order: any;

  constructor(private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.searchOrderForm = this.fb.group({
      trackingId: [null, Validators.required]
    })
  }

  submitForm() {
    this.authService.getOrderByTrackingId(this.searchOrderForm.get('trackingId')?.value).subscribe(res => {
      console.log(res);
      this.order=res;
    })
  }

}
