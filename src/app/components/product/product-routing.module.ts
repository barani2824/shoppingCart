import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/guard/role-guard.service';
import { ProductAddEditComponent } from './addedit/add-edit.component';
import { Constants } from 'src/app/shared/constants';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: Constants.ROUTE_PRODUCT_ADD,
                component: ProductAddEditComponent,
                canActivate: [RoleGuard],
                data: {
                    expectedRole: [Constants.ROLE_ADMIN]
                }
            },
            {
                path: Constants.ROUTE_PRODUCT_EDIT,
                component: ProductAddEditComponent,
                canActivate: [RoleGuard],
                data: {
                    expectedRole: [Constants.ROLE_ADMIN]
                }
            }
        ])
    ],
    exports: [RouterModule],
})
export class ProductRoutingModule {
}