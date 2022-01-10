import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "./project";
import {Mandate} from "../mandate/mandate";
import {MandateService} from "../mandate/mandate.service";
import {FormControl} from "@angular/forms";
import {MandateDescription} from "../mandate/MandateDescription";
import {ProjectService} from "./project.service";
import {LinkageService} from "../../assets/linkage.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [MandateService, ProjectService, LinkageService]
})
export class ProjectComponent implements OnInit {
  mandates: Mandate[] = [];
  mandatesAvailable: boolean = false;
  newMandateToggle: boolean = false;


  @Input() project!: Project;
  @Output() deleteProjectEvent: EventEmitter<Project> = new EventEmitter<Project>();

  constructor(private mandateService: MandateService, private projectService: ProjectService, private linkageService: LinkageService) { }

  mandateDescription = new FormControl('');
  mandateProfile = new FormControl('');
  startDate = new FormControl(Date);
  endDate = new FormControl(Date);

  ngOnInit(): void {
    this.getMandates();
    console.log(this.mandates)
    this.mandates != null ? this.mandatesAvailable = true : this.mandatesAvailable = false;
  }

  getMandates(): void {
    this.mandateService.getMandatesByIds(this.project.mandates).subscribe( mandates =>{
      this.mandates = [...mandates];
    });
  }

  deleteProject(): void {
    this.deleteProjectEvent.emit(this.project)
  }

  addNewMandate(): void {

    const mandateDescription: MandateDescription = {
      description: this.mandateDescription.value,
      profile: this.mandateProfile.value
    };

    const newMandate: Mandate = {
      id:"",
      projectId: null,
      // @ts-ignore
      employee: null,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      description: mandateDescription,
      happiness:0
    };
    console.log("new mandate: " + newMandate.description.description)

    this.mandateService.addNewMandate(newMandate).subscribe( mandate => {
      console.log(mandate);
      this.linkageService.mandateToProject(mandate.id, this.project.id);
      this.mandates.push(mandate);
    })

    this.resetMandateForm();
    this.newMandateToggle = false;

  }

  resetMandateForm(): void {
    this.mandateDescription.reset();
    this.mandateProfile.reset();
    this.startDate.reset();
    this.endDate.reset();
  }

}
