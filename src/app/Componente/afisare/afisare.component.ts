import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-afisare',
  templateUrl: './afisare.component.html',
  styleUrls: ['./afisare.component.scss']
})
export class AfisareComponent implements OnInit {
  req: any;
  db: any;

  contacts: any;
  tx: any;  

  reqView: any;
  contactsTabel: any;
  nrContacts: any;
  
  reqDel: any

  constructor() {

  } 

  ngOnInit(): void { 
    this.openDB();
  }

  @HostListener('window:load')
  onLoad() {
    this.openDB();
  }

  openDB(){
    this.req = indexedDB.open('agenda-telefonica');

    this.req.onupgradeneeded = (e: any) => {
      this.db = e.target.result;
      this.contacts = this.db.createObjectStore("Contacts", {keyPath: "name"});
    } 

    this.req.onerror = (e: any) => alert('Agenda nu s-a putut crea!' /*+ "Error" + e.target.errorCode*/)

    this.req.onsuccess = (e: any) => {
      this.db = e.target.result;      
      this.db.onerror = (e: any) => alert('Nu s-a realizat modificarea!' /*+ "Error" + e.target.errorCode*/)
      this.viewDB()
    }; 
       
  };

  viewDB(){
    this.tx = this.db.transaction("Contacts","readonly")
    this.contacts = this.tx.objectStore("Contacts");
    this.reqView = this.contacts.getAll();
    this.reqView.onsuccess = (e: any) => {
      this.contactsTabel = e.target.result; 
      this.nrContacts = this.contactsTabel.length;
      }; 
    this.reqView.onerror = (e: any) => alert('Nu se poate afisa agenda. Incercati mai tarziu!' /*+ "Error" + e.target.errorCode*/)
  };

  deleteContact(index: number){
    this.reqDel = this.db.transaction('Contacts', 'readwrite')
      .objectStore('Contacts')
      .delete(index);

    this.reqDel.onsuccess = ()=> {
      alert(`Contactul a fost sters.`);
    };

    this.reqDel.onerror = (e: Error)=> {
      alert(`Contactul nu a fost sters. Incercati mai tarziu: ${e}`);
    };
  }

}
