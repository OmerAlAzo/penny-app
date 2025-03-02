
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from "../../story/actions/user.actions"

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: false,
})
export class ResetPasswordComponent implements OnInit {

  password: string = '';
  confirmPassword: string = '';
  isPasswordMatch: boolean = true; // Flag to track if passwords match
  isPasswordValid: boolean = true; // Flag to track if password is valid

  isFocusedPass = false;
  isFocusedConfirmPass = false;
  isFilledPass = false;
  isFilledConfirmPass = false;

  isPasswordVisible = false;
  isConfirmPasswordVisible = false;

  constructor(private store: Store, private router: Router , private activatedRoute: ActivatedRoute) {}



  // Toggle Password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Toggle Confirm Password visibility
  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  // Focus and Blur methods for Password
  FocusPass() { this.isFocusedPass = true; }
  BlurPass() {
    if (!this.isFilledPass) this.isFocusedPass = false;
    this.validatePassword();
  }

  // Focus and Blur methods for Confirm Password
  FocusConfirmPass() { this.isFocusedConfirmPass = true; }
  BlurConfirmPass() {
    if (!this.isFilledConfirmPass) this.isFocusedConfirmPass = false;
    this.validatePasswordMatch();
  }

  // Check input for Password
  checkInputPass(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.isFilledPass = inputElement.value.trim().length > 0;
    this.validatePassword();
    // this.isPasswordValid = this.validatePasswordStrength();

  }

  // Check input for Confirm Password
  checkInputConfirmPass(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.isFilledConfirmPass = inputElement.value.trim().length > 0;
    this.validatePasswordMatch();
  }

  // Validate password match
  validatePasswordMatch() {
    this.isPasswordMatch = this.password === this.confirmPassword;
  }

  // Validate password function
  validatePassword() {
    const passwordRegex =  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    this.isPasswordValid = passwordRegex.test(this.password);
  }

 token : string = '' ;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get('token')!;
    });
  }

  onForgot() {
    if (!this.isPasswordMatch) {
      alert("Passwords do not match.");
      return;
    }
    if (!this.isPasswordValid) {
      alert("Please fix the password validation errors.");
      return;
    }

    this.store.dispatch(AuthActions.resetPassword({token: this.token , password: this.password, }));
    console.log( "reset : ", this.password , this.token)

    alert("Password updated successfully!");
    this.router.navigate(['/login']);
  }

}
