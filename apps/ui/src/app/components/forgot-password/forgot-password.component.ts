import { Component } from "@angular/core";
import * as AuthActions from "../../story/actions/user.actions";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
  standalone: false,
})
export class ForgotPasswordComponent {
  email: string = "";
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private store: Store, private router: Router) {}

  onForgot() {
    if (!this.email) {
      this.error = "Please enter your email address";
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = "Please enter a valid email address";
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      this.store.dispatch(AuthActions.forgotPass({ email: this.email }));
      this.successMessage = "Reset link has been sent to your email";
      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 2000);
    } catch (err) {
      this.error = "Failed to send reset link. Please try again.";
    } finally {
      this.loading = false;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
