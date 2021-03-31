app.component.ts

import { Component } from '@angular/core';
import {Contact} from './contact';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to Node+ Angular Test';
  ContactList:Contact[];
  

  constructor(private serv:ContactService)
  {
    this.ContactList=[];
    this.getContacts();
  }

  getContacts(){
      this.serv.getContacts().subscribe((contacts:Contact[])=>{

        this.ContactList=contacts;
        console.log(this.ContactList);
      })
  }


}

contact.service
import { Injectable } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Contact} from './contact';

@Injectable({
  providedIn: 'root'
})
 export class ContactService {

  constructor( private http: HttpClient) { 

  }

  getContacts(){
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts');
  }
}


contact class:

 export class Contact {
    _id?:string;
    first_name:string;
    last_name:string;
    phone:string;

    constructor(id:string,fname:string,lname:string,phone:string){
        this._id=id;
        this.first_name=fname;
        this.last_name=lname;
        this.phone = phone;
    }

}












