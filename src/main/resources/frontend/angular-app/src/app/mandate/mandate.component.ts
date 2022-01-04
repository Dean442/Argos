import {Component, Input, OnInit} from '@angular/core';
import {Mandate} from "./mandate";
import {EmployeesService} from "../employee/employees.service";
import {Employee} from "../employee/employee";

@Component({
  selector: 'app-mandate',
  templateUrl: './mandate.component.html',
  styleUrls: ['./mandate.component.scss'],
  providers: [EmployeesService]
})
export class MandateComponent implements OnInit {
  employee = {} as Employee;
  employeeAvialable: boolean = false;


  @Input() mandate!: Mandate;

  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployee();
    this.employee != null ?
      this.employeeAvialable = true : this.employeeAvialable = false;
  }

  getEmployee(): void {
    this.employeeService.getEmployeeById(this.mandate.employee).subscribe( employee => {
      this.employee = employee;
    });
  }

}
