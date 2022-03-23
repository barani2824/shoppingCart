import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatSlideToggleModule
    ],
    exports: [
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatSlideToggleModule
    ]
})

export class MaterialModule {}