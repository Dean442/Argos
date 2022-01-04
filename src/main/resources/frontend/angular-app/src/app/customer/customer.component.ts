import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from "./customer";
import {Project} from "../project/project";
import {ProjectService} from "../project/project.service";
import {CustomerService} from "./customer.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [ProjectService]
})
export class CustomerComponent implements OnInit {
  projects: Project[] = [];
  projectAvailable: boolean = false;
  newProjectToggle: boolean = false;

  @Input() customer!: Customer;
  @Output() updateList:  EventEmitter<string> = new EventEmitter<string>();

  projectName = new FormControl('');
  startDate = new FormControl(Date);
  endDate = new FormControl(Date);
  mandates = [];

  constructor(private projectService: ProjectService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getProjects();
    this.projects != null || this.projects != [] ? this.projectAvailable = true : this.projectAvailable = false;
  }

  deleteCustomer(): void {
    this.customerService.deleteCustomer(this.customer.id);
    this.updateList.emit("refresh");
  }

  getProjects(): void {
     this.projectService.getProjectsByIds(this.customer.projects).subscribe(projects => {
       this.projects = [...projects];
     });
  }

  toggleNewProjectForm(): void {
    this.newProjectToggle = !this.newProjectToggle;
  }

  addNewProject(): void {
    // @ts-ignore
    const id = null;
    const name = this.projectName.value;
    const startDate = this.startDate.value;
    const endDate = this.endDate.value;
    // @ts-ignore
    const mandates = []
    const projectCustomer =	this.customer.id;

    // @ts-ignore
    const newProject: Project = {id, name, startDate, endDate, mandates, projectCustomer};
    console.log(newProject)
    this.projectService.addNewProject(newProject).subscribe( project => {
      console.log('posted: ' + project.id)
      this.linkToCustomer(project.id);
    });

    this.newProjectToggle = false;
    for(let i = 0; i<4; i++)
      this.ngOnInit();

  }

  linkToCustomer(projectId: string) {
    this.customer.projects.push(projectId);
    this.customerService.updateCustomer(this.customer)
  }

  deleteProject(project: Project) {
    this.projectService.delete(project.id);
    for(let i = 0; i<4; i++)
      this.ngOnInit();
  }
}
