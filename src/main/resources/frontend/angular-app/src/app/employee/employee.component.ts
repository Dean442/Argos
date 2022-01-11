import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "./employee";
import { Output, EventEmitter } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  editmode: boolean = false;

  constructor() { }

  @Input() employee!: Employee;
  name = new FormControl('');
  firstName = new FormControl('');
  profile = new FormControl('');
  businessfield = new FormControl('');
  teamleader = new FormControl('');
  happiness = new FormControl('');
  health = new FormControl('');

  @Output() deleteEmployeeEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateEmployeeEvent: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() refreshEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.name.setValue(this.employee.name != undefined ? this.employee.name : '');
    this.firstName.setValue(this.employee.firstName != undefined ? this.employee.firstName : '');
    this.profile.setValue(this.employee.profile != undefined ? this.employee.profile : '');
    this.businessfield.setValue(this.employee.businessfield != undefined ? this.employee.businessfield : '');
    this.teamleader.setValue(this.employee.teamLeader != undefined ? this.employee.teamLeader : '');
    this.happiness.setValue(this.employee.happiness != undefined ? this.employee.happiness : '');
    this.health.setValue(this.employee.health != undefined ? this.employee.health : '');

  }

  deleteEmployee(): void {
    this.deleteEmployeeEvent.emit(this.employee.id);
  }

  toggleEdit(): void {
    this.ngOnInit()
    this.editmode ? this.editmode = false : this.editmode = true;
    // @ts-ignore
    this.employee.editmode = true;
  }

  saveEdit(): void {
    const id = this.employee.id;
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
    const mandates = this.employee.mandates;
    // @ts-ignore
    const happiness = this.happiness.value;
    // @ts-ignore
    const health = this.health.value;

    // @ts-ignore
    const updatedEmployee: Employee = {id,  name, firstName, profile, businessfield, teamLeader, mandates, happiness, health}

    this.editmode = false;
    this.updateEmployeeEvent.emit(updatedEmployee);
  }

}
