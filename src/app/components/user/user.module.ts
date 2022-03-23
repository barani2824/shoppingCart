import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserCartComponent } from "./cart/user-cart.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        UserCartComponent
    ],
    exports: [UserCartComponent]
})
export class UserModule { }