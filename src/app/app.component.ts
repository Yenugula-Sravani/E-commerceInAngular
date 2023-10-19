import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'OnlineWebsite';
  constructor(private storageService:StorageService,private authService:AuthService){

  }
  ngOnInit(): void {
    this.storageService.loadUsers();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  
}
