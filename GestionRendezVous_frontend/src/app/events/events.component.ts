import { Component, OnInit } from '@angular/core';
import { EventSettingsModel , DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import {  ViewChild } from '@angular/core';

import { ScheduleComponent, View } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

import {Service} from '../service' ;

declare var $: any;


import { PopupOpenEventArgs } from "@syncfusion/ej2-angular-schedule";
@Component({
  
  selector: 'app-events',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  //template: ''
  templateUrl: './events.component.html',
  //styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  

  constructor(private service:Service ) { }

  

data_all_events:Object[] =[] ;

id ;
  
  ngOnInit(): void {
    this.getEvents_s7i7a();
  }





      @ViewChild("scheduleObj")
public scheduleObj: ScheduleComponent;

private selectionTarget: Element;
public onPopupOpen(args: PopupOpenEventArgs): void {

  this.selectionTarget = null;
  this.selectionTarget = args.target ;

  // alert(this.selectionTarget.textContent);

  let eventData = this.scheduleObj.getEventDetails(this.selectionTarget);
 
  var nom_event = eventData.Subject ;

  var start_date_event = eventData.StartTime ;

  var end_date_event = eventData.EndTime ;


  // convert dates 

  this.service.getonvertDate(start_date_event).subscribe((new_start_date)=>{
    
    this.service.getonvertDate(end_date_event).subscribe( (new_end_date)=>{

     
      
 $('#ename').val(nom_event);

  $('.start_date').val(new_start_date) ;

  $('.end_date').val(new_end_date) ;

  // alert(nom_event + "/" + new_start_date + "/" + new_end_date);
  

  // extract start date + time   'start' 

  var date_start = new_start_date.substring(0,10);
  var time_start = new_start_date.substring(12,16);

  var start_date_time = date_start+" "+time_start ;


   // extract start date + time   'start' 

   var date_end = new_end_date.substring(0,10);
   var time_end = new_end_date.substring(12,16);
 
   var end_date_time = date_end+" "+time_end ;
 
  // alert(nom_event+" / "+start_date_time+" / "+end_date_time);
   
  /*
   alert(nom_event+" vs "+"test_55") ;

   alert(start_date_time+" vs "+"2021-06-04 5:10");

   alert(end_date_time+" vs "+"2021-06-04 6:15");

   */

   this.service.getIdEvent(nom_event.toString(),start_date_time.toString(),
   end_date_time.toString() ).subscribe( (id)=>{
    // alert("id = " + id);
     this.id = id ;
   });



    }) ;

  }) ;




}  

@ViewChild("addButton")
public addButton: ButtonComponent;
public selectedDate: Date = new Date(2018, 1, 15);
public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
public eventSettings: EventSettingsModel = {
  dataSource: this.data_all_events
}


// test data to calendar
/*

public onButtonClick(): void {
    let data: Object[] = [{
        Id: 3,
        Subject: 'Conference',
        StartTime: new Date(2018, 1, 12, 9, 0),
        EndTime: new Date(2018, 1, 12, 10, 0),
        IsAllDay: true
    }, {
        Id: 4,
        Subject: 'Meeting',
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 11, 30),
        IsAllDay: false
    }];
    
    let Events = getAllEvents("hahahah","","");

    this.scheduleObj.addEvent(Events);
    this.addButton.element.setAttribute('disabled','true');

}

*/




// add event to calendar 




addEvent(f){

  var nom_event = f.value['nom'];

  // start date+time part

  var start_date_time_event = f.value['start_date'] ;

  var start_date = start_date_time_event.substring(0, 10);

  var start_time = start_date_time_event.substring(18,12);


  // end date+time part


  var end_date_time_event = f.value['end_date'] ;

  var end_date = end_date_time_event.substring(0, 10);

  var end_time = end_date_time_event.substring(20,12);

  // db 

  var time_in = start_date+" "+start_time ;
  var time_out = end_date+" "+end_time ;

 //  alert(nom_event+" / "+time_in+" / "+time_out) ;

  
  this.service.add_event(nom_event,time_in,time_out
  ).subscribe( (res)=>{
      alert(res);
  })
  

 
}


editEvent(f){
  
  var nom_event = $('#ename').val();

  var start_date_time_event = $('.start_date').val() ;

  var end_date_time_event = $('.end_date').val() ;

  // start date+time part


  var start_date = start_date_time_event.substring(0, 10);

  var start_time = start_date_time_event.substring(18,12);


  // end date+time part


  var end_date = end_date_time_event.substring(0, 10);

  var end_time = end_date_time_event.substring(20,12);

  // db 

  var time_in = start_date+" "+start_time ;
  var time_out = end_date+" "+end_time ;

   // alert(nom_event+" / "+time_in+" / "+time_out) ;

   // get the event id avec => nom = nom_event / starttime = time_in

   // / endtime = time_out

   /*
   alert("ancient event id = " + this.id ) ;

   alert("nouvelle valeur de modification event :");

   alert(nom_event+" / "+time_in+" / "+time_out);

   */

   this.service.update_event(this.id,nom_event,time_in,time_out).subscribe((res)=>{
     alert(res);
   })



   

}




deleteEvent(f){
 
  this.service.delete_event(this.id).subscribe((res)=>{
    alert(res);
  })
 
}

// add events to calendar 

getEvents_s7i7a(){
  
 this.service.getEvents().subscribe( (events)=>{
   
  events.forEach(event => {
    var nom_event = event['nom'];
    var start_time = event['starttime'];
    var end_time = event['endtime'];

    // extract anne / mois / jour (start)

    var start_year = start_time.substring(0,4);
    var start_month = start_time.substring(5,7)-1;
    var start_day = start_time.substring(8,10);

    // extract heures + minutes de ( start )

    var start_hour = start_time.substring(11,12);
    var start_minute = start_time.substring(13,15);

    // extract anne / mois / jour (end)

    var end_year = end_time.substring(0,4);
    var end_month = end_time.substring(5,7)-1;
    var end_day = end_time.substring(8,10);

     // extract heures + minutes de ( end )

     var end_hour = end_time.substring(11,12);
     var end_minute = end_time.substring(13,15);
 
     /*

    alert("start : year = " + start_year + " /month = " + start_month+
    " /day = " + start_day + " // hour = " + start_hour +" /minute = " + start_minute );

    alert("end : year = " + end_year + " /month = " + end_month+
    " /day = " + end_day + "// hour = " + end_hour + " /minute = " + end_minute );

    */

    // inserer chaque instace de 'event' dans le var 'data_all_events'
    
    setEvents( this.data_all_events , nom_event,start_year,start_month,start_day,start_hour,start_minute,
      end_year,end_month,end_day,end_hour,end_minute);

     // alert("insersion mrigla");
  });

   
 });
 


}

}

//set event

function setEvents(data, Subject,start_year,start_month,start_day
  , start_hour,start_minute,end_year,end_month,end_day,end_hour,end_minute){
 // date(annee,mois,jour,heure,minutes)

  var event={Id:2,Subject:Subject,StartTime:new Date(parseInt(start_year), parseInt(start_month)
    , parseInt(start_day) , parseInt(start_hour) , parseInt(start_minute) ),
  
    EndTime:new Date( parseInt(end_year) , parseInt(end_month) , 
    parseInt(end_day), parseInt(end_hour) , parseInt(end_minute) ) };

  data.push(event);


}







//set
function getAllEvents(nom_event,start_date,end_date){


  let data: Object[] = [{
    Id: 3,
    Subject: nom_event,
    // date(annee,mois,jour,heure,minutes)
    StartTime: new Date(2018, 1, 12, 9, 0),
    EndTime: new Date(2018, 1, 12, 10, 0),
}];

return data ;

}



