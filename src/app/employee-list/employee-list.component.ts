import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;
  numCols: number;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();

    this.numCols = (window.innerWidth <= 600) ? 1 : 4;
    
  }

  onResize(event): void {
    this.numCols = (event.target.innerWidth <= 600) ? 1 : 4;
  }

  updateEmployee(employee: Employee): void {
    this.employeeService.save(employee).subscribe(returnedEmployee => {
      this.employees.map(currentEmployee => currentEmployee.id === returnedEmployee.id ? returnedEmployee : currentEmployee);
    });
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.remove(employee).subscribe( _ => {
      this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
    });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
