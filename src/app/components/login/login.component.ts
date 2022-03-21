import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../user/model/user.model';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;  
  users: User[] = [];  
  userName = '';   

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem(Constants.LOGGED_IN_USER) != null) {
      this.router.navigate([Constants.ROUTE_HOME]);
    } else {
      this.userService.getAllUsers().subscribe((users) => {
        this.users = users;
      }, err => {
      });
    }
  }

  login() {
    const enterdUser = this.users.filter((user) => {
        return user.email === this.userName;
    })[0];
    this.isLoggedIn = true;
    this.authService.setLoggedInUser(enterdUser);
    this.router.navigate([Constants.ROUTE_HOME])
  }

}

