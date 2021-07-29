import { Component, OnInit } from '@angular/core';

import {Service} from '../service' ;
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {

  
  constructor(private service:Service ) { }

  nom_user = this.getUserName();

  mail_user = this.getUserEmail();

  photo_user = this.getUserPhoto() ;

  

  ngOnInit(): void {
   // this.getAllComments() ;
  }

  getUserName(){
    this.service.getCurrentUserName().subscribe((nom)=>{
      // alert("app comp - user nom = " + nom);
      this.nom_user = nom ;
    });
  }

  getUserEmail(){
    this.service.getCurrentUserMail().subscribe((mail)=>{
      // alert("app comp - user nom = " + nom);
      this.mail_user = mail ;
    });
  }

  getUserPhoto(){
    this.service.getUserObject_with_email().subscribe((user)=>{
        this.photo_user = user[0]['photo'] ;
    });
  }


  // get all comments from database .

  getAllComments(){
    this.service.getAllComments().subscribe((comments)=>{
      this.comments_user = comments ;
      console.log(comments);
    })
  }

  comments_user = this.getAllComments() ;


  add_comment(f){
     console.log(this.comments_user);
    // alert( this.comments_user[0]['message'] ) ;
    // alert("photo = " + this.photo_user);

    
    var message_user = (<HTMLInputElement>document. getElementById("message") ).value ;

    var nom_user = this.nom_user ;
    var mail_user = this.mail_user ;
    var photo_user = this.photo_user ;


    var message = f.value['message'];

    /*
    alert("message = " + message_user + " // nom = " + nom_user + " // mail = " +
    
    mail_user +" // photo = " + photo_user ) ;
    */
    
    // add comment 

    
    this.service.add_comment(message_user.toString(),nom_user,mail_user,photo_user).subscribe((res)=>{
      alert(res) ;
    });
    
    

  }

}
