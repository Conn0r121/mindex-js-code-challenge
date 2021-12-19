import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

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

  getDirectReports(): Employee[] {
    return this.reports.filter(reporter => this.employee.directReports.includes(reporter.id))
  }

  updateDirectReport(employee: Employee) {
    this.updateEmployee.emit(employee);
  }

  deleteDirectReport(employee: Employee) {
    this.deleteEmployee.emit(employee);
  }
}
