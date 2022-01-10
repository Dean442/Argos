import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";

@Injectable()
export class LinkageService {

  baseUrl = 'http://localhost:8080/link/'

  constructor(private http: HttpClient) {
  }

  private _refresh$ = new Subject<void>()

  get refresh() {
    return this._refresh$;
  }

  private _refreshBench$ = new Subject<void>()

  get refreshBench() {
    return this._refreshBench$;
  }

  updateBench() {
    this._refreshBench$.next();
  }
  projectToCustomer(projectId: string, customerId: string): void {
    const refresh = this.http.put(this.baseUrl + 'projectToCustomer/' + projectId + '/' + customerId, null).pipe(
      tap(() => {
        this._refresh$.next();
      }));

    refresh.subscribe( message => {
      console.log(message)
    });
  }

  projectFromCustomer(projectId: string, customerId: string): void {
    const refresh = this.http.put(this.baseUrl + 'projectFromCustomer/' + projectId + '/' + customerId, null).pipe(
      tap(() => {
        this._refresh$.next();
      }));

    refresh.subscribe(message => {
      console.log(message)
    });
  }

  mandateToProject(mandateId: string, projectId: string): void {
    const refresh = this.http.put(this.baseUrl + 'mandateToProject/' + mandateId + '/' + projectId, null).pipe(
      tap(() => {
        this._refresh$.next();
      }));

    refresh.subscribe(message => {
      console.log(message)
    });
  }

  mandateFromProject(mandateId: string, projectId: string): void {
    const refresh = this.http.put(this.baseUrl + 'mandateFromProject/' + mandateId + '/' + projectId, null).pipe(
      tap(() => {
        this._refresh$.next();
      }));
    refresh.subscribe(message => {
      console.log(message)
    });
  }

  employeeToMandate(employeeId: string, mandateId: string): Observable<Object> {
    const refresh = this.http.put(this.baseUrl + 'employeeToMandate/' + employeeId + '/' + mandateId, null).pipe(
      tap(() => {
        this._refresh$.next();
        this._refreshBench$.next()
      }));
    refresh.subscribe(message => {
      this._refreshBench$.next()
      console.log("employee linked"+message)
    });
    this._refresh$.next();
    this._refreshBench$.next()
    return refresh;
  }

  employeeFromMandate(employeeId: string, mandateId: string): Observable<Object> {
    const refresh = this.http.put(this.baseUrl + 'employeeFromMandate/' + employeeId + '/' + mandateId, null)
      .pipe(
        tap(() => {
          this._refresh$.next();
          this._refreshBench$.next()
      }));
    refresh.subscribe(message => {
      console.log(message)
    });
    return refresh;
  }

}
