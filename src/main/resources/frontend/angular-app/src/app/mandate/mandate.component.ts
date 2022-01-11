import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Mandate} from "./mandate";
import {EmployeesService} from "../employee/employees.service";
import {Employee} from "../employee/employee";
import {MandateService} from "./mandate.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {LinkageService} from "../../assets/linkage.service";

@Component({
  selector: 'app-mandate',
  templateUrl: './mandate.component.html',
  styleUrls: ['./mandate.component.scss'],
  providers: [EmployeesService]
})
export class MandateComponent implements OnInit {
  employee: Employee = {} as Employee;
  employeeAvialable: boolean = false;


  @Input() mandate!: Mandate;

  @Output() refreshEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private employeeService: EmployeesService, private mandateService: MandateService, private linkageService: LinkageService) {

  }

  ngOnInit(): void {
    if(this.mandate.employee == null || this.mandate.employee == '') {
      this.employeeAvialable = false;
    }else {
      this.employeeAvialable = true;
      this.getEmployee();
    }
  }

  deleteEmployee(id: string): void {
    this.linkageService.employeeFromMandate(this.mandate.employee, this.mandate.id).subscribe(() => {
      // @ts-ignore
      this.mandate.employee = null;
      this.employeeAvialable = false;
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.ngOnInit();
        // @ts-ignore
        document.getElementById('refresh'+this.mandate.id).click();
      });
    });
  }

  removeEmployee(): void {
    // @ts-ignore
    this.mandate.employee = null;
    this.employeeAvialable = false;
    this.ngOnInit()
  }

  getEmployee(): void {
    this.employeeService.getEmployeeById(this.mandate.employee).subscribe( employee => {
      this.employee = employee;
    });
  }

  deleteMandate(): void {
    this.mandateService.deleteMandate(this.mandate.id).subscribe( deleted => {
      console.log(deleted)
      this.refreshEvent.emit("");
    });
  }

  drop($event: CdkDragDrop<string[]>) {
    // @ts-ignore
    const employeeId = $event.item.element.nativeElement.children.item(0).id;
    this.linkageService.employeeToMandate(employeeId, this.mandate.id).subscribe( () => {
      this.mandate.employee = employeeId;
      this.employeeAvialable = true;
      this.ngOnInit();
      // @ts-ignore
      document.getElementById('refreshBench').click();
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe( () => {
      this.employeeService.getEmployeeById(this.mandate.employee).subscribe( () => {
        this.ngOnInit();
      });
    });
  }


  unlink() {
    this.refreshEvent.emit("")
    this.ngOnInit()
  }
}
