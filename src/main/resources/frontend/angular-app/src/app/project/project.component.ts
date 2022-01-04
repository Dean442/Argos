import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "./project";
import {Mandate} from "../mandate/mandate";
import {MandateService} from "../mandate/mandate.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [MandateService]
})
export class ProjectComponent implements OnInit {
  mandates: Mandate[] = [];
  mandatesAvailable: boolean = false;

  @Input() project!: Project;
  @Output() deleteProjectEvent: EventEmitter<Project> = new EventEmitter<Project>();

  constructor(private mandateService: MandateService) { }

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

}
