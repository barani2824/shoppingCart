import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/components/user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MenuToggleService } from 'src/app/service/menu-toggle.service';
import { Constants } from 'src/app/shared/constants';
import { ThemeService } from '../../theme/theme.service';
import { BroadcastService } from 'src/app/service/broadcast/broadcast.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedInUser!: User | null;
  cartCountSubscription: Subscription;
  cartCount = 0;

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService,
  private menuToggleService: MenuToggleService, private broadcastService: BroadcastService) {
  }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    }, err => {

    });
    this.cartCountSubscription = this.broadcastService.receiveMsg(Constants.CART_UPDATED_COUNT, (count) => {
        this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
    this.broadcastService.clearMsgByEvent(Constants.CART_UPDATED_COUNT);
  }

  toggleSideNav() {
    this.menuToggleService.toggle();
  }

  logout() {
    this.authService.clearLoggedInUser();
    window.location.reload();
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
