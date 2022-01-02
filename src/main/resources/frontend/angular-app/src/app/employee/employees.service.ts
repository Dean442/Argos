import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';

import { Employee } from './employee';

@Injectable()
export class EmployeesService {
  baseUrl = 'http://localhost:8080/employee/';

  constructor(private http: HttpClient) {
  }

  getEmployeeById(id: string): Observable<Employee> {
    id = id.trim();
    return this.http.get<Employee>(this.baseUrl + id)
  }

  getBench(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'bench');
  }

  addEmployee(employee: Employee): void{
    this.http.post<Employee>(this.baseUrl + 'newEmployee', employee).subscribe(employee => {
      console.log(employee);
    });
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    employee.id.trim();
    return this.http.put<Employee>(this.baseUrl + employee.id, employee);
  }

  deleteEmployee(id: string): Observable<Employee> {
    id.trim();
    console.log(id)
    const toreturn = this.http.delete<Employee>(this.baseUrl + id);
    toreturn.subscribe(data => {
      console.log(data)
    })
    return toreturn;
  }
}
