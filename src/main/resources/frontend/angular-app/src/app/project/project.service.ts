import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "./project";
import {idList} from "../../assets/idList";

@Injectable()
export class ProjectService {
  baseUrl = 'http://localhost:8080/project/'

  constructor(private http: HttpClient) {
  }

  getProjectsByIds(idsArray: String[]): Observable<Project[]> {
    let list: idList;
    const obj = {"ids": idsArray};
    list = <idList>obj;
    return this.http.post<Project[]>(this.baseUrl + 'projectsByIds', list);
  }

  addNewProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl + 'newProject', project)
  }

  delete(id: string):void {
    this.http.delete<Project>( this.baseUrl+ id).subscribe( project => {
      console.log('deleted project: ' + project.id)
    });
  }

}
