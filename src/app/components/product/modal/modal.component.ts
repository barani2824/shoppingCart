import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from '../model/modal.model';

@Component({
  selector: 'app-my-modal',
  templateUrl: './modal.component.html',
})

export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData) {}
}