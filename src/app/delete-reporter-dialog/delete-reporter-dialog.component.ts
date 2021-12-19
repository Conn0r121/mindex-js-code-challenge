import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-reporter-dialog',
  templateUrl: './delete-reporter-dialog.component.html',
  styleUrls: ['./delete-reporter-dialog.component.css']
})
export class DeleteReporterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteReporterDialogComponent>) { }

  ngOnInit(): void {
  }

}
