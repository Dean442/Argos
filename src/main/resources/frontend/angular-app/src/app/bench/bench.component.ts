import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "../employee/employees.service";
import {Employee} from "../employee/employee";
import {FormControl} from "@angular/forms";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {LinkageService} from "../../assets/linkage.service";
import {map, startWith, tap} from "rxjs";
import {MandateService} from "../mandate/mandate.service";

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.scss'],
  providers: [EmployeesService, LinkageService, MandateService]
})
export class BenchComponent implements OnInit {
  employees: Employee[] = [];
  employeesDisplayed: Employee[] = [];
  filter = new FormControl('');
  name = new FormControl('');
  firstName = new FormControl('');
  profile = new FormControl('');
  businessfield = new FormControl('');
  teamleader = new FormControl('');
  happiness = new FormControl(0);
  health = new FormControl('');

  newEmployeeFormToggle: boolean = false;
  MandateLists: string[] = [];

  constructor(private employeeService: EmployeesService, private linkageService: LinkageService, private mandateService: MandateService) {

  }

  ngOnInit(): void {
    this.getBench();
    this.filter.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.employees.slice();
      }),
    ).subscribe(x => this.employeesDisplayed = x);
    this.mandateService.getAllMandates().subscribe(mandates => {
      mandates.forEach(mandate => {
        if (mandate.employee == null)
          this.MandateLists.push('mandate'+mandate.id)
      })
    } )
  }

  displayFn(employee: Employee): string {
    return employee && employee.name ? employee.name : '';
  }

  private _filter(name: string): Employee[] {
    const filterValue = name.toLowerCase();

    return this.employees.filter(option => option.name.toLowerCase().includes(filterValue) || option.firstName.toLowerCase().includes(filterValue));
  }
  getBench(): void {
    this.employeeService.getBench().subscribe(bench => this.employees = bench);
    this.employeeService.getBench().subscribe( bench => this.employeesDisplayed = bench);
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

    this.employeeService.addEmployee(newEmployee).subscribe(() => {
      this.ngOnInit();
    });
    this.employees.push(newEmployee);
    this.employeesDisplayed = this.employees;

    //reset form
    this.name.reset('');
    this.firstName.reset('');
    this.profile.reset('');
    this.businessfield.reset('');
    this.teamleader.reset('');
    this.happiness.reset();
    this.health.reset('');

    this.newEmployeeFormToggle = false;
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe( () => this.ngOnInit());
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  drop($event: CdkDragDrop<Employee>) {
    const mandateId = $event.previousContainer.id;

    // @ts-ignore
    const employeeId = $event.item.element.nativeElement.id;

    const unlink = this.linkageService.employeeFromMandate(employeeId, mandateId).pipe(
      tap(() => {
        this.ngOnInit();
        // @ts-ignore
        document.getElementById('refresh'+mandateId).click();
      }));
    unlink.subscribe( () => {
      this.ngOnInit();
      // @ts-ignore
      document.getElementById('refresh'+mandateId).click();
    });
  }
}
