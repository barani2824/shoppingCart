import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/components/user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Constants } from 'src/app/shared/constants';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedInUser!: User | null;

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    }, err => {

    });
  }

  logout() {
    this.authService.clearLoggedInUser();
//     window.location.reload();
  }

  toggleTheme() {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
        this.themeService.setTheme('dark');
    } else {
        this.themeService.setTheme('light');
    }
  }

}
