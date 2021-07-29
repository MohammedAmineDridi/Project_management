
import { Component, OnInit } from '@angular/core';
import {Service} from '../service' ;

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 img_name ; 

  formData = new FormData();

  

  constructor(private service:Service , private http: HttpClient ) { }

  ngOnInit(): void {
  }


  selectImage(files: FileList){

    this.formData.delete('image');
    this.formData.append('image', files[0]);

    this.img_name = files[0].name ; 

  }



 

  save_user(f){
  
    
    var nom = f.value['nom']
    var prenom = f.value['prenom'] ;
    var password = f.value['password'];
    var email = f.value['email'];


 alert(nom + " / " + prenom +" / " + email +" / " + password +" / " + this.img_name ) ;
    
   
   return this.http.post('/api/insert_user', this.formData).subscribe(
      (data) => {
        alert('File Uploaded Successfully')
        //alert(data) ;

        this.service.add_user(nom,prenom,email,password,this.img_name).subscribe((res)=>{ alert(res);})
      },
      (error) => {
        alert('Something Went Wrong !!!')
      }
    );


    /*
    this.service.add_user(nom,prenom,email,password,this.img_name).subscribe(
      (data)=>{
        alert(data) ;
      }
    )
    */
    
    // part 2 : add user 

  }

  

}
