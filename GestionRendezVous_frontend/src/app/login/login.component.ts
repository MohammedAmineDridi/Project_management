import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

 import {Service} from '../service' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
 


  constructor(private service:Service) { }

  username ;
  

  ngOnInit(): void {

   // this.service.test().subscribe((data)=>{console.log(data) ;}) ;
    
  }

  // sendPostRequest(data).subscribe(
   // res => {
   //   console.log(res);
   //  });

  // login function 
 
   login_function(email,password){
    this.service.login(email,password).subscribe((res)=>{console.log(res);}) ;
   }

   // test route function 


   test_function(){
     this.service.test().subscribe((data)=>{
       console.log(data) ;
       return data ;

      }) ;
   }
 
  

  save(f){
    var email = f.value['email'];
    var password = f.value['password'];

     this.service.login(email,password).subscribe(data=>{
      alert("welcome " + data);
      // session management 
      this.username = data ; 

    }) ;
    
  }

  getCurrentUser(){
    this.service.getCurrentUserName().subscribe(
      (user_nom)=>{ alert(user_nom) ;}
    );
  }




}

