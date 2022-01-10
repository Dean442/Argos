import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {Project} from "./project";
import {idList} from "../../assets/idList";

@Injectable()
export class ProjectService {
  baseUrl = 'http://localhost:8080/project/'

  constructor(private http: HttpClient) {
  }

  private _refreshProjects$ = new Subject<void>()

  get refreshProjects() {
    return this._refreshProjects$;
  }

  getProjectsByIds(idsArray: String[]): Observable<Project[]> {
    let list: idList;
    const obj = {"ids": idsArray};
    list = <idList>obj;
    const projects = this.http.post<Project[]>(this.baseUrl + 'projectsByIds', list).pipe(
      tap(() => {
        this._refreshProjects$.next();
      }));

    return projects;

  }

  addNewProject(project: Project): Observable<Project> {
    const newProject = this.http.post<Project>(this.baseUrl + 'newProject', project).pipe(
      tap(() => {
        this._refreshProjects$.next();
      }));
    return newProject;
  }

  delete(id: string):void {
    const deleted = this.http.delete<Project>( this.baseUrl+ id).pipe(
      tap(() => {
        this._refreshProjects$.next();
      }));

    deleted.subscribe( project => {
      console.log('deleted project: ' + project.id)
    });
  }

  updateProject(project: Project) {
    const updated = this.http.put<Project>(this.baseUrl + project.id, project).pipe(
      tap(() => {
        this._refreshProjects$.next();
      }));
    updated.subscribe(updatedProject => {
      console.log("updated: " + updatedProject)
    })
    return updated;

  }
}
