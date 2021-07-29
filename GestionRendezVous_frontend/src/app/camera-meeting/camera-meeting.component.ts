import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../web-socket.service';

import { Service } from '../service';

@Component({
  selector: 'app-camera-meeting',
  templateUrl: './camera-meeting.component.html',
  styleUrls: ['./camera-meeting.component.css']
})
export class CameraMeetingComponent implements OnInit {

  messageList:  string[] = [];

  usernamesList:  string[] = [];

  usernames_messages_list:  string[] = [];

   username ;

    users_list:  string[] = [];

    photo_user:  string[] = [];

     username_photo:  any[] = [];

  constructor(private socket_service:WebSocketService , private service:Service) { }

  ngOnInit(): void {

    



    // get all messg

   this.socket_service.listen('new-message1').subscribe( (msg:string)=>{
   // alert("messge detected test = " + msg);
    this.messageList.push(msg);
    });
    
    this.socket_service.listen('new-message1-username').subscribe( (username:string)=>{
      alert(username + " send a message ");
      this.usernamesList.push(username);

  });

     
  // listen username+messgae


 this.socket_service.listen('message-username1').subscribe( (user_msg)=>{
    // add username in list of participants
    this.usernames_messages_list.push( user_msg.toString() );
});


    // final test 

    this.socket_service.listen('test_add_user1').subscribe( (users)=>{
        

        for(var i=0;i<this.users_list.length;i++){
          if(users == this.users_list[i]){
              // alert(users + "existe dans la liste  ") ;
              this.users_list.pop();
          }
          else{
            // alert( users + " n'existe pas dans la liste ") ;
            alert(users + ' join the meet now ') ;
          }
        }

        this.users_list.push( users.toString() );

        this.service.getUserwithName( users).subscribe( (res)=>{
          /*
          alert("nom = " + res[0]['nom'] + " // prenom =  "
          + res[0]['prenom'] + " // password = " + res[0]['password'] );
            */
          this.photo_user.push( res[0]['photo'] ) ;

      });

    });


    // delete username in list_users connected .

    this.socket_service.listen('delete_username1').subscribe( (users)=>{
      alert(users + " left the meet now ");    
     // this.users_list.push( users.toString() ) ;
     for(var j=0;j<this.users_list.length;j++){
        if( this.users_list[j] == users ){
          alert( users + " left the met now " ) ;
          var index = j ;
          this.users_list.splice(index,1);
        }
     }

    });

   

  }





  sendmsg(){

    var msg = (<HTMLInputElement>document.getElementById("msg_text") ).value ;

    this.service.getCurrentUserName().subscribe( (username)=>{

     // alert("message from " + username);


   this.socket_service.emit('new-message', msg );

   this.socket_service.emit('new-message-username',username);

   // emit username + msg .

   var msg_username = username + " : " + msg ;

   this.socket_service.emit('message-username',msg_username);


    });

    (<HTMLInputElement>document.getElementById("msg_text") ).value = '';

  
  }

  


  list_participants(){

    document.getElementById("btn_msg").style.display="none";
    
    this.username_photo=[];
    
    for(var k=0;k<this.users_list.length;k++){

      for(var j=0;j<this.photo_user.length;j++){
        if(j==k){
          /*
          alert(this.users_list[k] + " / " +
        this.photo_user[j] ) ;
          */
        this.username_photo.push( [ this.users_list[k],this.photo_user[j] ] );

        }
      }

    }

    document.getElementById("btn_msg").style.display="none";
    document.getElementById("msg_text").style.display="none";
    document.getElementById("login_div").style.display="none";
    
  }

  chat_room(){
    document.getElementById("btn_msg").style.display="block";
    document.getElementById("msg_text").style.display="block";
    document.getElementById("login_div").style.display="block";
  }



  

}
