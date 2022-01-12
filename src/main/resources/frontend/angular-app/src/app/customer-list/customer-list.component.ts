import { Component, OnInit } from '@angular/core';
import {Customer} from "../customer/customer";
import {CustomerService} from "../customer/customer.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  customerAvailable: boolean = false;
  customerFormToggle: boolean = false;

  custName = new FormControl('');

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.refreshCustomers.subscribe(() => {
      this.getCustomers();
    });
    this.getCustomers();
    this.customers != null ? this.customerAvailable = true : this.customerAvailable = false;
  }

  ngOnDestroy():void {
    this.customerService.refreshCustomers.unsubscribe();
  }

  getCustomers(): void {
    this.customerService.getAllCustomers().subscribe(customers => {
      customers.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
      this.customers = [...customers];

    });
  }

  toggleCustomerForm(): void {
    this.customerFormToggle = !this.customerFormToggle;
  }

  refresh(): void {
    for (let i = 0; i<2; i++)
      this.ngOnInit();
  }

  createNewCustomer():void {
    const id = null;
    const name = this.custName.value;
    // @ts-ignore
    const projects = [];

    console.log(name)
    // @ts-ignore
    const newCustomer: Customer = {id, name, projects};

    this.customerService.postCustomer(newCustomer);

    this.customerFormToggle = false;
  }
}
