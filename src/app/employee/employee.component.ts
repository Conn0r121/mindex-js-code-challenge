import {Component, Input, OnInit} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  reports: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
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
}
