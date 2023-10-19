import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  isValidUser(user: User): boolean {
    // console.log(user.email, user.password);

    let users: User[] = this.storageService.getAllUsers();
    let isUser = false;
    for (let uInLoop of users) {
      if (
        uInLoop.email === user.email &&
        uInLoop.password === uInLoop.password
      ) {
        this.storageService.setLoggedInUser(uInLoop);
        sessionStorage.setItem("userId",JSON.stringify(uInLoop.id));
        isUser = true;
        break;
      }
      
      console.log(isUser);
    }
    return isUser;
  }

  logout() {
    return this.storageService.removeLoggedInUser();
  }

  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
}
