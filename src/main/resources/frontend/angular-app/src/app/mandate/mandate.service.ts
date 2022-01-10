import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Mandate} from "./mandate";
import {idList} from "../../assets/idList";


@Injectable()
export class MandateService {
  baseUrl = 'http://localhost:8080/mandate/';

  constructor(private http: HttpClient) {
  }

  getMandateById(id: string): Observable<Mandate> {
    return this.http.get<Mandate>(this.baseUrl + id)
  }

  getMandatesByIds(ids: String[]): Observable<Mandate[]> {
    let list: idList;
    const obj = {"ids": ids};
    list = <idList>obj;
    return this.http.post<Mandate[]>(this.baseUrl + 'mandatesByIds', list);
  }

  getAllMandates(): Observable<Mandate[]> {
    return this.http.get<Mandate[]>(this.baseUrl + 'allMandates')
  }

  updateMandate(mandate: Mandate): Observable<Mandate> {
    return this.http.put<Mandate>(this.baseUrl + mandate.id, mandate);
  }

  addNewMandate(mandate: Mandate): Observable<Mandate> {
    return this.http.post<Mandate>(this.baseUrl + 'newMandate/', mandate);
  }

  deleteMandate(id: string) {
    console.log(id)
    return this.http.delete<Mandate>(this.baseUrl + id);

  }
}
