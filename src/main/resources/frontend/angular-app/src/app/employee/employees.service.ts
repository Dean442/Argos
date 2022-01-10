import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable, Subject, tap} from 'rxjs';

import { Employee } from './employee';

@Injectable()
export class EmployeesService {
  baseUrl = 'http://localhost:8080/employee/';

  constructor(private http: HttpClient) {
  }

  private _refreshEmployees$ = new Subject<void>()

  get refreshEmployees() {
    return this._refreshEmployees$;
  }

  getEmployeeById(id: string): Observable<Employee> {
    const employee =  this.http.get<Employee>(this.baseUrl + id).pipe(
      tap(() => {
        this._refreshEmployees$.next();
      }));
    return employee;
  }

  getBench(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'bench');
  }

  addEmployee(employee: Employee): void{
    this.http.post<Employee>(this.baseUrl + 'newEmployee', employee).pipe(
      tap(() => {
        this._refreshEmployees$.next();
    })).subscribe( employee => {
      console.log(employee)
    });
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const updated = this.http.put<Employee>(this.baseUrl + employee.id, employee).pipe(
      tap(() => {
        this._refreshEmployees$.next();
      }));
    updated.subscribe( employee => {
      console.log(employee)
    })
    return updated;
  }

  deleteEmployee(id: string): Observable<Employee> {
    console.log(id)
    const toreturn = this.http.delete<Employee>(this.baseUrl + id).pipe(
      tap(() => {
        this._refreshEmployees$.next();
      }));
    toreturn.subscribe( employee => {
      console.log(employee)
    });
    return toreturn;
  }
}
