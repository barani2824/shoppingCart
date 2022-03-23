import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { ProductCatalogComponent } from "./catalog/product-catalog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ProductAddEditComponent } from "./addedit/add-edit.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSnackBarModule
    ],
    declarations: [
        ProductCatalogComponent,
        ProductAddEditComponent
    ]
})
export class ProductModule { }