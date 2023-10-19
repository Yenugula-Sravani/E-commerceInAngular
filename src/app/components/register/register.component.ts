import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {}
  error: string = '';
  onSubmit(registerForm: NgForm) {
    console.log(registerForm);
    console.log(typeof registerForm.value);

    const value: object = registerForm.value;
    this.storageService.setAllUsers(value);

    if (this.authService.isValidUser(registerForm.value)) {
      this.router.navigate(['/login'], { replaceUrl: true });
    } else {
      this.error = 'invalid user!!';
    }
  }
}
