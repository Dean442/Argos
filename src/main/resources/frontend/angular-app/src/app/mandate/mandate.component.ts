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
  employee = {} as Employee;
  employeeAvialable: boolean = false;


  @Input() mandate!: Mandate;

  @Output() refreshEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private employeeService: EmployeesService, private mandateService: MandateService, private linkageService: LinkageService) { }

  ngOnInit(): void {
    console.log("checking for employee"+ this.mandate.employee)
    if(this.mandate.employee != null ) {
      this.employeeAvialable = true;
      this.getEmployee();
    }
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
    console.log('mandates:')
    // @ts-ignore
    const employeeId = $event.item.element.nativeElement.children.item(0).id;
    this.linkageService.employeeToMandate(employeeId, this.mandate.id).subscribe( value => {
      this.refreshEvent.emit("");
      this.linkageService.refreshBench.next();
    });

  }

  unlink() {
    console.log('unlinking')
    this.refreshEvent.emit("")
    this.ngOnInit()
  }
}
