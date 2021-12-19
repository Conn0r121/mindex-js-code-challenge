import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateReporterDialogComponent } from '../update-reporter-dialog/update-reporter-dialog.component';
import { DeleteReporterDialogComponent } from '../delete-reporter-dialog/delete-reporter-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() updateEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();

  reports: Employee[] = [];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllReports(this.employee.directReports);
  }

  private getAllReports(employeeIds: number[] | null) {
    employeeIds?.forEach(employeeId => {
      this.employeeService.get(employeeId).subscribe(returnedEmployee => {
        this.reports.push(returnedEmployee);
        this.getAllReports(returnedEmployee.directReports);
      });
    });
  }

  getDirectReports(): Employee[] {
    return this.reports.filter(reporter => this.employee.directReports.includes(reporter.id))
  }

  openUpdateDirectReportDialog(employeeToUpdate: Employee): void {
    const dialogRef = this.dialog.open(UpdateReporterDialogComponent, {
      // adding partial data fields so user can edit fields then cancel without 
      //seeing live updates on site behind dialog
      data: {
        firstName: employeeToUpdate.firstName,
        lastName: employeeToUpdate.lastName,
        position: employeeToUpdate.position,
        compensation: employeeToUpdate.compensation,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      employeeToUpdate.firstName = result.firstName;
      employeeToUpdate.lastName = result.lastName;
      employeeToUpdate.position = result.position;
      employeeToUpdate.compensation = result.compensation;

      this.updateEmployee.emit(employeeToUpdate);
    });
  }

  openDeleteDirectReportDialog(employeeToDelete: Employee): void {
    const dialogRef = this.dialog.open(DeleteReporterDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) { this.deleteEmployee.emit(employeeToDelete); }
    });
  }
}
