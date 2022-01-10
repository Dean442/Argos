import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {Customer} from "./customer";

@Injectable()
export class CustomerService {
  baseUrl = 'http://localhost:8080/customer/';

  constructor(private http: HttpClient) {
  }

  private _refreshCustomers$ = new Subject<void>()

  get refreshCustomers() {
    return this._refreshCustomers$;
  }


  getCustomer(id: string): Observable<Customer> {
    const customer = this.http.get<Customer>(this.baseUrl + id);
    customer.subscribe(customer => {
      console.log(customer)
    });
    return customer;
  }

  getAllCustomers(): Observable<Customer[]> {
    console.log('getting customers');
    return this.http.get<Customer[]>(this.baseUrl + 'allCustomers');
  }

  postCustomer(customer: Customer): Observable<Customer> {
    console.log('posting customer' + customer)
    const newCustomer = this.http.post<Customer>(this.baseUrl + 'newCustomer', customer).pipe(
      tap(() => {
        this._refreshCustomers$.next();
      }));
    newCustomer.subscribe(customer => {
      console.log(customer);
    });
    return newCustomer;
  }

  deleteCustomer(id: string): void {
    console.log('deleting customer: '+ id);
    const deleted = this.http.delete(this.baseUrl + id).pipe(
      tap(() => {
        this._refreshCustomers$.next();
      }));

    deleted.subscribe(customer =>{
      console.log('deleted' + customer)
    });
  }

  updateCustomer(customer: Customer) {
    console.log('updating ' + customer.id)
    const updated = this.http.put<Customer>(this.baseUrl + customer.id, customer).pipe(
      tap(() => {
        this._refreshCustomers$.next();
      }));

    updated.subscribe(customer =>{
      console.log('updated' + customer)
    });
  }


}
