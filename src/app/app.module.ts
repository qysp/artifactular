import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDetailComponent } from './_components/card-detail/card-detail.component';
import { CardsComponent } from './_components/cards/cards.component';
import { SimulatorComponent } from './_components/simulator/simulator.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    SimulatorComponent,
    CardDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
