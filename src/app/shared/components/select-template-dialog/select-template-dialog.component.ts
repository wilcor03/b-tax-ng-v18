import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-select-template-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatListModule
  ],
  standalone: true,
  templateUrl: './select-template-dialog.component.html',
  styleUrl: './select-template-dialog.component.scss'
})
export class SelectTemplateDialogComponent implements OnInit {
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log('INPUT', this.data.pucCode)
  }
}
