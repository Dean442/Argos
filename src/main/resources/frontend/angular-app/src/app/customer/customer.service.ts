import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./customer";

@Injectable()
export class CustomerService {
  baseUrl = 'http://localhost:8080/customer/';

  constructor(private http: HttpClient) {
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
    const newCustomer = this.http.post<Customer>(this.baseUrl + 'newCustomer', customer);
    newCustomer.subscribe(customer => {
      console.log(customer);
    });
    return newCustomer;
  }

  deleteCustomer(id: string): void {
    console.log('deleting customer: '+ id);
    this.http.delete(this.baseUrl + id).subscribe(customer =>{
      console.log('deleted' + customer)
    });
  }

  updateCustomer(customer: Customer) {
    console.log('updating ' + customer.id)
    this.http.put<Customer>(this.baseUrl + customer.id, customer).subscribe(customer =>{
      console.log('updated' + customer)
    });
  }


}
