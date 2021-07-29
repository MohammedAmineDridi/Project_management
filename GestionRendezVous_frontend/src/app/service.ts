import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',  // le service partagable dans tt l'app .
  })


  export class Service {


    constructor(private http: HttpClient) { }

     // test route 


     test(){
      const url_test_route = "/api/test_route" ;
  
        return this.http.get<any>(url_test_route) ; // observable object
     }


      // service 1 : login
   //   sendPostRequest(data: any): Observable<any> {
   //     return this.httpClient.post<any>(YOUR-SERVER-URL, data);
   // }


      login(email,password) : Observable<any>  {

        // let postData_user = {email : email ,password :password};
         
        const url_login = "/api/login" ;
         return  this.http.post(url_login,{
          email:email,
          password:password
         });
        }


        // insert user
    
        add_user(nom,prenom,email,password,photo) : Observable<any> {
         
          const url_insert_user = "/api/add_user/"+photo.toString();
          
         return this.http.post(url_insert_user,{
          nom : nom ,
          prenom :prenom ,
           email:email,
            password:password ,
             photo:photo 
         });

        }


        // update user
    
        update_user(nom,prenom,email,password) : Observable<any> {
         
          const url_update_user = "/api/modifier_profile";
          
         return this.http.post(url_update_user,{
          nom : nom ,
          prenom :prenom ,
           email:email,
            password:password 
         });

        }

        // upload files img .

        img_upload(formdata){
          const url_upload = "/api/insert_user" ;
          return this.http.post(url_upload , formdata) ;

        }


        getCurrentUserName(){
          const url_getuser_nom = "/api/getCurrentUserNom" ;

          return this.http.get<any>(url_getuser_nom) ;
        }

        getCurrentUserMail(){
          const url_getuser_mail = "/api/getCurrentUserMail" ;
          return this.http.get<any>(url_getuser_mail) ;

        }

        getUserObject_with_email(){

          const url_userObject = "/api/getUser_with_email" ;

          return this.http.get<any>(url_userObject) ;
        }


        // get all comments 

        getAllComments(){

          const url_comments = "/api/comments" ;

          return this.http.get<any>(url_comments) ;
        }

        // add comment 

        add_comment(message,nom,email,photo) : Observable<any> {
         
          const url_add_comment = "/api/add_comment/"+photo;
          
         return this.http.post(url_add_comment,{
          message : message ,
          nom :nom ,
           email:email,
            photo:photo 
         });

        }


        // destroy user session .

        logout(){
          const url_logout = "/api/logout" ;

          return this.http.get<any>(url_logout) ;
        }

        // add event 

        add_event(nom,start_date,end_date) : Observable<any> {
         
          const url_insert_event = "/api/add_event" ;
          
         return this.http.post(url_insert_event,{
          nom : nom ,
          starttime : start_date ,
           endtime : end_date
            
         });

        }

        // get all events 

        getEvents(){
            const url_all_events = "/api/getAllEvents" ;
            return this.http.get<any>(url_all_events) ;
  
        }

        // convert date 

        getonvertDate(old_date){
          const url_date = "/api/getDate/"+old_date ;
          return this.http.get<any>(url_date) ;
          
        }



        // update event by id 

        update_event(id,nom,start_time,end_time){
          const url_update_event = "/api/modifier_event/"+id ;
          
          return  this.http.post(url_update_event,{
            nom:nom,
            starttime:start_time,
            endtime:end_time
           });
          

        }


        getIdEvent(nom,start_time,end_time) : Observable<any>  {

          // let postData_user = {email : email ,password :password};
           
          const url_id_event = "/api/getEventId" ;
           return  this.http.post(url_id_event,{
            nom:nom,
            start:start_time,
            end:end_time
           });
          }

          // delete event 

          
        delete_event(id){
          const url_delete_event = "/api/deleteEvent/"+id ;
          return this.http.get<any>(url_delete_event) ;
          
        }

        getUserwithName(nom){
            const url_name  ="/api/getUserswithName/"+nom ;
            return this.http.get<any>(url_name);
        }



        
    
        }


  

