import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

import {EmployeeComponent} from './employee.component';
import {MatCardModule} from '@angular/material/card';
import {EmployeeService} from '../employee.service';
import {of} from 'rxjs';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

// adding suite of example employees for testing. reporting hierarchy is as follows
//                  1
//                /    \
//               2      4
//                       \
//                        3
const employee1 = {
  id: 1,
  firstName: 'first1',
  lastName: 'last1',
  position: 'jobTitle1',
  compensation: 100,
  directReports: [2, 4]
};

const employee2 = {
  id: 2,
  firstName: 'first2',
  lastName: 'last2',
  position: 'jobTitle2',
  compensation: 200
};

const employee3 = {
  id: 3,
  firstName: 'first3',
  lastName: 'last3',
  position: 'jobTitle3',
  compensation: 300
};

const employee4 = {
  id: 4,
  firstName: 'first4',
  lastName: 'last4',
  position: 'jobTitle4',
  compensation: 400,
  directReports: [3]
};

const employees = [employee1, employee2, employee3, employee4];

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

employeeServiceSpy.get.and.callFake((employeeId: Number) => of(employees.find(employee => employee.id === employeeId)));

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
      // adding imports to remove npm warnings for not including mat-card during tests
      imports: [
        MatCardModule,
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = employee1;

    expect(comp).toBeTruthy();
  }));


  it('should generate full report list on init with a single direct report', async(() => {
    // testing to correctly ensure that employee3 reports to employee4
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = employee4;
    fixture.detectChanges();
    expect(comp.reports).toEqual([employee3]);
  }));

  it('should generate full report list on init with a direct and indirect reports', async(() => {
    // testing to correctly ensure that employee2, employee4, and employee3 report to employee1
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = employee1;
    fixture.detectChanges();
    expect(comp.reports).toEqual([employee2, employee4, employee3]);
  }));

  it('should generate full report list on init with no reports', async(() => {
  // testing to correctly ensure that no one reports to employee3
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = employee3;
    fixture.detectChanges();
    expect(comp.reports).toEqual([]);
  }));
});
