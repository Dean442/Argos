import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "../employee/employees.service";
import {Employee} from "../employee/employee";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.scss'],
  providers: [EmployeesService]
})
export class BenchComponent implements OnInit {
  employees: Employee[] = [];
  benchLoaded = false;
  name = new FormControl('');
  firstName = new FormControl('');
  profile = new FormControl('');
  businessfield = new FormControl('');
  teamleader = new FormControl('');
  happiness = new FormControl(null);
  health = new FormControl('');


  constructor(private employeeService: EmployeesService) {

  }

  ngOnInit(): void {
    this.getBench();
    this.benchLoaded = true;
  }

  getBench(): void {
    let bench: Employee[] = [];
    this.employeeService.getBench().subscribe(employees => {
      bench = employees;
      this.employees = [...bench];
    });
  }

  addNewEmployee() {
    const id = null;
    // @ts-ignore
    const name = this.name.value.trim();
    // @ts-ignore
    const firstName = this.firstName.value.trim();
    // @ts-ignore
    const profile = this.profile.value.trim();
    // @ts-ignore
    const businessfield = this.businessfield.value.trim();
    // @ts-ignore
    const teamLeader = this.teamleader.value.trim();
    // @ts-ignore
    const mandates = [];
    // @ts-ignore
    const happiness = this.happiness.value;
    // @ts-ignore
    const health = this.health.value.trim();

    // @ts-ignore
    const newEmployee: Employee = {id,  name, firstName, profile, businessfield, teamLeader, mandates, happiness, health}

    this.employeeService.addEmployee(newEmployee);
    this.employees.push(newEmployee);
    this.employees = [...this.employees];

    //reset form
    this.name.reset();
    this.firstName.reset();
    this.profile.reset();
    this.businessfield.reset();
    this.teamleader.reset();
    this.happiness.reset();
    this.health.reset();

    //update bench
    for( let i = 0; i<4 ; i++)
      this.ngOnInit();

  }

  deleteEmployee(event: string): void {
    console.log(event);
    this.employeeService.deleteEmployee(event);
    console.log('deleted')
    for( let i = 0; i<4 ; i++)
      this.ngOnInit();
  }
}
