import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './../auth.service';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
    isLoading = false;
    private authStatusSub: Subscription;

    constructor(public authService: AuthService){}

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    onSignup(form: NgForm){
        if(form.invalid){
            return;
        }
        this.authService.createUser(form.value.name, form.value.email, form.value.phone, form.value.password);
        form.resetForm();
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}