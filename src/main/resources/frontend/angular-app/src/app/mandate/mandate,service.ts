import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Mandate} from "./mandate";

@Injectable()
export class MandateService {
  baseUrl = 'http://localhost:8080/mandate/';

  constructor(private http: HttpClient) {
  }

  getMandateById(id: string): Observable<Mandate> {
    id = id.trim();
    return this.http.get<Mandate>(this.baseUrl + id)
  }

  getAllMandates(): Observable<Mandate[]> {
    return this.http.get<Mandate[]>(this.baseUrl + 'allMandates')
  }

  updateMandate(mandate: Mandate): Observable<Mandate> {
    mandate.id.trim();
    return this.http.put<Mandate>(this.baseUrl + mandate.id, mandate);
  }

  addNewMandate(mandate: Mandate): Observable<Mandate> {
    return this.http.post<Mandate>(this.baseUrl, mandate);
  }
}
