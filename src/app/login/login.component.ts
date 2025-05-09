import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserStorageService } from '../storage/user-storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatIconModule,RouterLink,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm: FormGroup;
    hidePassword = true;
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        });
    }
  
    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
  }
  
  onSubmit(): void {
      const username = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
  
      this.authService.login(username, password).subscribe(
          (res) => {
            if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
            } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
            }
          },
          (error) => {
              this.snackBar.open('Bad credentials', 'ERROR', { duration: 5000 });
          }
      );
  }

}
