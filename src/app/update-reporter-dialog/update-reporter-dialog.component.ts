import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Employee} from '../employee';



@Component({
  selector: 'app-update-reporter-dialog',
  templateUrl: './update-reporter-dialog.component.html',
  styleUrls: ['./update-reporter-dialog.component.css']
})
export class UpdateReporterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateReporterDialogComponent>, @Inject(MAT_DIALOG_DATA) public employee: Employee) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
