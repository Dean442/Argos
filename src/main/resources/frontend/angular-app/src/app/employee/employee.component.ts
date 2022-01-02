import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "./employee";
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor() { }

  @Input() employee!: Employee;

  @Output() deleteEmployeeEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  deleteEmployee(): void {
    console.log('todelete:' + this.employee)
    this.deleteEmployeeEvent.emit(this.employee.id);
  }

}
