import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// socket.io 

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// calendar import part

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// http module

import { HttpClientModule } from '@angular/common/http';


// calendar version 2 part : schedule module import . 

import { ScheduleModule , DayService ,
  WeekService , WorkWeekService , MonthService , AgendaService
  , MonthAgendaService , TimelineViewsService , 
  TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { AboutMeComponent } from './about-me/about-me.component';

// config socket-io

const config: SocketIoConfig = { url: 'http://localhost:4500', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    AboutMeComponent,
  ],
  imports: [
    ScheduleModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    // calendar part
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot(config), // import socket.io config 
    NgbModalModule,
    FlatpickrModule.forRoot(),
     
    // fin calendar part
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, 
    AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
