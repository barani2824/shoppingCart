import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from 'src/app/components/product/modal/modal.component';
import { ModalData } from 'src/app/components/product/model/modal.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ModalData): Observable<boolean> {
    return this.dialog
      .open(ModalComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}