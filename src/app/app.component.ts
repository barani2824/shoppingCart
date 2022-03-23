import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/components/user/model/user.model';
import { MenuToggleService } from 'src/app/service/menu-toggle.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') public drawer: MatDrawer;

  title = 'Hardware Application';

  loggedInUser!: User | null;

  constructor(private authService: AuthService,
              private menuToggleService: MenuToggleService) {
  }

  ngOnInit(): void {
      this.authService.getLoggedInUser().subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }, err => {

      });
  }
  ngAfterViewInit(): void {
    this.menuToggleService.setDrawer(this.drawer);
  }
}
