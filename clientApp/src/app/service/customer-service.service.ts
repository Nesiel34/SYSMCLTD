import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAddress } from '../interfaces/Address.interface';
import { IContact } from '../interfaces/Contacts.interface';
import { ICustomer } from '../interfaces/Cutomer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient){}


  getAllCustomers(){
    return this.httpClient.get<ICustomer[]>(`${environment.baseUrl}customers`);
  }

  checkDuplicateCustomer(name:string){
    return this.httpClient.get<boolean>(`${environment.baseUrl}customers/checkDuplicate/${name}`);
  }

  insertCustomer(data:ICustomer){
    data.created = new Date();
    data.isDeleted = false;
    return this.httpClient.post<any>(`${environment.baseUrl}customers`,data);
  }



  updateCustomer(data:ICustomer){
    return this.httpClient.put<any>(`${environment.baseUrl}customers/${data.id}`,data);
  }

  getAllContact(customerid:string){
    return this.httpClient.get<IContact[]>(`${environment.baseUrl}Contacts/${customerid}`);
  }

  insertContact(data:IContact){
    data.created = new Date();
    data.isDeleted = false;
    return this.httpClient.post<any>(`${environment.baseUrl}Contacts`,data);
  }

  getAllAddress(customerid:string){
    return this.httpClient.get<IAddress[]>(`${environment.baseUrl}Addresses/${customerid}`);
  }



}
