import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from './guard/role-guard.service';
import { ProductCatalogComponent } from './components/product/catalog/product-catalog.component';
import { Constants } from './shared/constants';

const appRoutes: Routes = [
  {
    path: Constants.ROUTE_HOME, component: ProductCatalogComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
    }
  },
  { path: Constants.ROUTE_LOGIN, component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
