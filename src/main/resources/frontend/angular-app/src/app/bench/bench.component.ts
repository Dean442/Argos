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
  name = new FormControl('');
  firstName = new FormControl('');
  profile = new FormControl('');
  businessfield = new FormControl('');
  teamleader = new FormControl('');
  happiness = new FormControl(0);
  health = new FormControl('');

  newEmployeeFormToggle: boolean = false;

  constructor(private employeeService: EmployeesService) {

  }

  ngOnInit(): void {
    this.getBench();
  }

  getBench(): void {
    let bench: Employee[] = [];
    this.employeeService.getBench().subscribe(employees => {
      bench = employees;
      this.employees = [...bench];
    });
  }

  toggleNewEmployeeForm(): void {
    this.newEmployeeFormToggle = !this.newEmployeeFormToggle;
  }

  addNewEmployee() {
    const id = null;
    // @ts-ignore
    const name = this.name.value;
    // @ts-ignore
    const firstName = this.firstName.value;
    // @ts-ignore
    const profile = this.profile.value;
    // @ts-ignore
    const businessfield = this.businessfield.value;
    // @ts-ignore
    const teamLeader = this.teamleader.value;
    // @ts-ignore
    const mandates = [];
    // @ts-ignore
    const happiness = this.happiness.value;
    // @ts-ignore
    const health = this.health.value;

    // @ts-ignore
    const newEmployee: Employee = {id,  name, firstName, profile, businessfield, teamLeader, mandates, happiness, health}

    this.employeeService.addEmployee(newEmployee);
    this.employees.push(newEmployee);
    this.employees = [...this.employees];

    //reset form
    this.name.reset('');
    this.firstName.reset('');
    this.profile.reset('');
    this.businessfield.reset('');
    this.teamleader.reset('');
    this.happiness.reset();
    this.health.reset('');

    //update bench
    for( let i = 0; i<2 ; i++)
      this.ngOnInit();

    this.newEmployeeFormToggle = false;
  }

  updateEmployee(employee: Employee) {
    console.log('update Employee event recieved');
    this.employeeService.updateEmployee(employee)
    console.log('updated')
    for (let i= 0 ; i <4 ; i++)
      this.ngOnInit();
  }

  deleteEmployee(id: string): void {
    console.log(id);
    this.employeeService.deleteEmployee(id);
    console.log('deleted')
    for( let i = 0; i<4 ; i++)
      this.ngOnInit();
  }
}
