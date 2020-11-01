import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { AuthService } from "./../auth.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  private socialAuthStatusSub: Subscription;
  user: SocialUser;

  constructor(
    public authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.socialAuthStatusSub = this.socialAuthService.authState.subscribe(
      (user) => {
        this.user = user;
        this.isLoading = false;
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    form.resetForm();
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.socialAuthStatusSub.unsubscribe();
  }
}
