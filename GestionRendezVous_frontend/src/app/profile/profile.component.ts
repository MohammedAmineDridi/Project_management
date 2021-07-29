import { Component, OnInit } from '@angular/core';

import {Service} from '../service' ;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ObjectUser;
  chemin_photo:String ="C:/Users/dridi family/Desktop/VS_CODE/gestionRendezVous/GestionRendezVous/src/assets/template/img/users/"
  constructor(private service:Service) { }

  
  ngOnInit(): void {
    

    this.service.getCurrentUserMail().subscribe((user_mail)=>{
     // alert("user mail = " + user_mail );


      this.service.getUserObject_with_email().subscribe( (user)=>{
        /*
        alert("nom = " + user[0]['nom'] + " // prenom = " 
        + user[0]['prenom'] + " // email = " + user[0]['email']
        + " // password = " + user[0]['password'] + " // photo = " +
        user[0]['photo'] );
        */

         this.ObjectUser = func(user[0]) ;

        // alert("-> object user 'nom' == " + this.ObjectUser['nom']);
         
      } )

    });


  

  }

  


  

  edit_user(){

     /*
    alert("user 'nom' = " + this.ObjectUser['nom'] + " // prenom = " + 
    
    this.ObjectUser['prenom'] + " //email = " + this.ObjectUser['email'] + 
    
    " // password = " + this.ObjectUser['password'] + " // photo = " + 
    
    this.chemin_photo + this.ObjectUser['photo'] );
    */

    // update user

    var nom_user = (<HTMLInputElement>document. getElementById("nom") ).value ;

    var prenom_user = (<HTMLInputElement>document. getElementById("prenom") ).value ;

    var email_user = (<HTMLInputElement>document. getElementById("email") ).value ;

    var password_user = (<HTMLInputElement>document. getElementById("password") ).value ;


    this.service.update_user(nom_user,prenom_user,
    email_user,password_user).subscribe((res)=>{
      alert(res);
    })
    


  }

 




}

function func(utilisateur){
  var user = utilisateur ;
  return user ;
}
