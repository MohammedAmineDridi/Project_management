import { Component, OnInit } from '@angular/core';
import {Service} from '../app/service' ;

import { WebSocketService } from './web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  ngOnInit(){
  
  }

  constructor(private service:Service , private websocketService:WebSocketService ) { }

  title = 'GestionRendezVous';
  nom_user = this.getUserName();
  photo_user = this.getPhotoUser();
 

  getUserName(){
    this.service.getCurrentUserName().subscribe((nom)=>{
      // alert("app comp - user nom = " + nom);
      this.nom_user = nom ;


    });
  }

  getPhotoUser(){
    
    this.service.getUserObject_with_email().subscribe((user)=>{
      this.photo_user = user[0]['photo'] ;
     // alert("app comp - user photo = " + user[0]['photo'] ) ;
    })

  }

  logout(){
    this.service.logout().subscribe((res)=>{
      alert(res);
    })
  }

  
 

   camera_btn(){
    
   this.service.getCurrentUserName().subscribe( (username)=>{
      this.websocketService.emit('test_add_user',username);
     
   });

   } 



}




