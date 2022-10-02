import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdaugareComponent } from './Componente/adaugare/adaugare.component';
import { AfisareComponent } from './Componente/afisare/afisare.component';

@NgModule({
  declarations: [
    AppComponent,
    AdaugareComponent,
    AfisareComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
