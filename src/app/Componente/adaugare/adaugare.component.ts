import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-adaugare',
  templateUrl: './adaugare.component.html',
  styleUrls: ['./adaugare.component.scss']
})
export class AdaugareComponent implements OnInit {
  req: any;
  db: any;
 
  contacts: any;
  tx: any;
   
  contact = {
    name: '',
    number: ''
  } 

  constructor() { }

  ngOnInit(): void {
    this.createDB();
  }

  @HostListener('window:load')
  onLoad() {
    this.createDB();
  }

  createDB(){
    this.req = indexedDB.open('agenda-telefonica', 1);

    this.req.onupgradeneeded = (e: any) => {
      this.db = e.target.result;
      this.contacts = this.db.createObjectStore("Contacts", {keyPath: "name"});
    } 

    this.req.onerror = (e: any) => alert('Agenda nu s-a putut crea!' /*+ "Error" + e.target.errorCode*/)

    this.req.onsuccess = (e: any) => {
      this.db = e.target.result;      
      this.db.onerror = (e: any) => alert('Nu s-a realizat modificarea!' /*+ "Error" + e.target.errorCode*/)
    };    
  };

  createContact(prenume:string, nume:string, numar:string){
    this.contact.name = prenume + ' ' + nume;
    this.contact.number = numar;
  }

  addContact(){ 
    this.tx = this.db.transaction("Contacts","readwrite");
    this.tx.onerror = (e:any) => alert('Aveti salvat acest contact!' /*+ "Error" + e.target.errorCode*/)
    this.contacts = this.tx.objectStore("Contacts");
    this.contacts.add(this.contact);

    this.contacts.onsuccess = ()=> {
      alert(`Contactul a fost adaugat.`);
    };

    this.contacts.onerror = (e: Error)=> {
      alert(`Contactul nu a fost adaugat. Incercati mai tarziu: ${e}`);
    };
    location.reload()
  }

}
