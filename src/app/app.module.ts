import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AllcarComponent } from './allcar/allcar.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AddcarComponent } from './addcar/addcar.component';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { CarComponent } from './car/car.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ContactComponent,
    FooterComponent,
    AddcarComponent,
    CarComponent
    
    
  ],
  imports: [
    BrowserModule,
    AllcarComponent,
    RouterModule,       // ← ეს აუცილებელია routerLink-ისთვის
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
