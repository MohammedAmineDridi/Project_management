var express = require('express');
var router = express.Router();

const session = require('express-session');


const date = require('date-and-time');




/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("//");
  res.end();
});



// 1 - route login

router.post('/api/login', function(req, res, next) {
  var db =req.db;
  var c = db.get('users');  

  email = req.body.email ; 
  password = req.body.password ; 
  c.find({"email":email,"password":password},{},function(e,docs){
    if(docs ==''){
      res.json("login incorrecte !!");
    }  
    else{
        req.session.user_nom = docs[0].nom ;

        req.session.user_email = docs[0].email ;

        req.session.save() ;

        console.log("nom = " + req.session.user_nom + " // email = " + req.session.user_email) ;

      res.json(req.session.user_nom);
    }
    
    });
});

  

// function download image in assets folder while 'sign in' user . 

const fileUpload = require('express-fileupload');



// default options
router.use(fileUpload());


// 2 - function to download image file in specific location 



const fs = require('fs');
const Path = require('path');
const Axios = require('axios');


// fonction to download image

async function download_img(nom_image_produit,url){

  const img_path_location = "C:/Users/dridi family/Desktop/VS_CODE/gestionRendezVous/GestionRendezVous/src/assets/template/img" ;
    

 const path = Path.resolve(img_path_location,'users',nom_image_produit.toString() );

 const response = await Axios({
   method:'GET',
   url:url,
   responseType:'stream',   
 })

 response.data.pipe( fs.createWriteStream(path) )

 return new Promise( (resolve,reject)=>{
     // listen to event in readable streams .
     response.data.on('end', ()=>{
         resolve()
     })

     response.data.on('error',err =>{
         reject(err)
     })

 })

}



// 2 - route sign In 




router.post('/api/insert_user', function(req, res, next) {
  

  // part 1 : upload photo

   img = req.files.image;

   const location_upload = "C:/Users/dridi family/Desktop/VS_CODE/gestionRendezVous/GestionRendezVous/src/assets/template/img/users/";

   uploadPath = location_upload + img.name;

  // Use the mv() method to place the file somewhere on your server

  res.send(img) ;

  img.mv(uploadPath, function(err) {
     if (err){
     // return res.json("erreur dans l'upload de photo");
    }
    else{
     // res.json("img file is uploaded ") ;
    }
    
  });
   


  
  // part 2 : insert user in db . 
  
  /* 
  var db = req.db ; 

   var c = db.get('users') ;   


   
  var nom_user = req.body.nom ;
  var prenom_user = req.body.prenom;
  var email_user = req.body.email;
  var password_user = req.body.password ;
  var photo_user = img.name ;
  


  var mon_user = { nom: nom_user ,
                  prenom : prenom_user ,
                  email : email_user ,
                  password : password_user ,
                  photo : photo_user ,
          
  };

  
  c.insert(mon_user,function(err,result){

  console.log(mon_user);

  if (err){
    res.json("erreur d'ajouter user ");
  }
  else{
    res.json("User added Successfully ") ;
  }
   

  });

 */


});


// part2 : insert user 

router.post('/api/add_user/:photo_user', function(req, res, next) { 


  var db = req.db ; 

  var c = db.get('users') ;   


  
 var nom_user = req.body.nom ;
 var prenom_user = req.body.prenom;
 var email_user = req.body.email;
 var password_user = req.body.password ;
 var photo_user = req.params.photo_user ;
 


 var mon_user = { nom: nom_user ,
                 prenom : prenom_user ,
                 email : email_user ,
                 password : password_user ,
                 photo : photo_user ,
         
 };

 
 c.insert(mon_user,function(err,result){

 console.log(mon_user);

 if (err){
   res.json("erreur d'ajouter user ");
 }
 else{
   res.json("User added Successfully ") ;
 }
  

 });


});


router.get('/test_session', function(req, res) {

  req.session.user_email = "33" ; 

  req.session.save() ;

  res.send(req.session.user_email);
});


// route get use photo by email user .

router.get('/api/get_photo_by_mail', function(req, res) {

  var db =req.db;
  var c = db.get('users');  
  
  var email = req.session.user_email ;

 

  c.find({'email':email},{},function(err,result){

    if(err){
          console.log(" erreur load photo = " + err) ;
          res.send(err);   
    }
    else{

      console.log("photo name = " + result[0].photo ) ;
      
      var full_photo_location = "C:/Users/dridi family/Desktop/VS_CODE/gestionRendezVous/GestionRendezVous/src/assets/template/img/users/" + result[0].photo ;

      res.end(full_photo_location) ;
       
    }
   });


});


// upload img file with 'multer' .

var multer  = require('multer');

var cors = require('cors') ;
const { start } = require('repl');

router.use(cors({origin:"*"})) ;


const storage = multer.diskStorage({
  destination:(req,file,callBack)=>{
    callBack(null,'C:/Users/dridi family/Desktop/VS_CODE/gestionRendezVous/GestionRendezVous/src/assets/template/img/users')
  },

  filename:(req,file,callBack)=>{
    callBack(null, file.originalname )
  }

}) // we define here : upload img : destination folder + img file name .

var upload = multer({ storage:storage })


// now , create the file upload route .

router.post('/api/upload', upload.single('file'), function(req, res) { 


    const file = req.file ;

    console.log(file.filename) ;

    if(!file){
      return res.json("erreur img upload !")
    }
    else{
      res.send(file);
    }

});


// modifier test_session


router.get('/api/setUser/:user_name/:email', upload.single('file'), function(req, res) {

      var user_name = req.params.user_name ;

      var email = req.params.email ;
      

      req.session.user_nom = user_name ;

      req.session.user_email = email ;

      res.json(user_name + " / " + email) ;
 });



// session route


router.get('/api/getCurrentUserNom', function(req, res) {

  res.json(req.session.user_nom) ;

 });


 router.get('/api/getCurrentUserMail',  function(req, res) {

  res.json(req.session.user_email) ;

 });
 

 // route select avec session.user_mail

 router.get('/api/getUser_with_email', upload.single('file'), function(req, res) {

  var db =req.db;
  var c = db.get('users');  


  var email_user = req.session.user_email ;

  c.find({"email":email_user},{},function(e,user){
    if(user ==''){
      res.json("probleme de user mail");
    }
    else{

      console.log("get user with mail user successfully ") ;

      console.log("nom = " + user[0].nom + " // email =  " + user[0].email  
      + " // password = " + user[0].password   ) ;

      res.json(user);
    }
    
    }); 

 });


 // route update user profile 

 
router.post('/api/modifier_profile', function(req, res, next) {
 
  var db = req.db ; 

  var c = db.get('users') ;   

 
  var new_user = { $set: {
     nom: req.body.nom ,
     prenom:req.body.prenom  ,
     email : req.body.email ,
     password : req.body.password 
      } };


  c.findOneAndUpdate({"email":req.session.user_email}, new_user ,{new : true},function(err,docs){

      if (err) {

        res.json(" erreur : user nom trouvée ");

      }

      else{

        res.json("user updated succesfully") ;
      
      }
  });
     

});


// get all from comments

// 1 - route login

router.get('/api/comments', function(req, res, next) {
  var db =req.db;
  var c = db.get('comments');  

  c.find({},{},function(e,comments){
    if(comments ==''){
      res.json("no comments !!");
    }  
    else{

      res.json(comments);
    }
    
    });
});


// add comment



router.post('/api/add_comment/:photo', function(req, res, next) { 


  var db = req.db ; 

  var c = db.get('comments') ;   

// current date and time

const now = new Date();
  
var Date_now = date.format(new Date(), 'DD-MM-YYYY'); 

var Time_now = date.format(new Date(), 'hh:mm');   


  
 var nom_user = req.body.nom ;
 var email_user = req.body.email;
 var message_user = req.body.message ;
 var photo_user = req.params.photo ;
 


 var comment = { message: message_user ,
                 nom : nom_user ,
                 email : email_user ,
                 date : Date_now ,
                 time : Time_now ,
                 photo : photo_user
         
 };

 
 c.insert(comment,function(err,result){

 console.log(comment);

 if (err){
   res.json("erreur d'ajouter comment ");
 }
 else{
   res.json("comment added Successfully ") ;
 }
  

 });


});

// destroy user session 


router.get('/api/logout', function(req, res, next) { 

  req.session.destroy();

  res.json('you are logged out') ;

});


// add event to calendar 


// part2 : insert user 

router.post('/api/add_event', function(req, res, next) { 


  var db = req.db ; 

  var c = db.get('events') ;   


  
 var nom_event = req.body.nom ;
 var event_start_date = req.body.starttime;
 var event_end_date = req.body.endtime ;

 


 var new_event = { nom: nom_event ,
                 starttime : event_start_date ,
                 endtime : event_end_date ,
               
         
 };

 
 c.insert(new_event,function(err,result){

 console.log(new_event);

 if (err){
   res.json("error to add event ");
 }
 else{
   res.json("event added Successfully ") ;
 }

 });


});


// route get all events 


router.get('/api/getAllEvents' , function(req, res) {

  var db =req.db;
  var c = db.get('events');  


  c.find({},{},function(e,events){
    if(events ==''){
      res.json("no existing events !");
    }
    else{
      res.json(events);
    }
    
    }); 

 });


 // get event id 

 
 
router.post('/api/getEventId', function(req, res, next) {
 
  var db =req.db;
  var c = db.get('events');  

  nom = req.body.nom ; 
  start_date = req.body.start ; 
  end_date = req.body.end ;

  console.log("nom = " + nom +" / start date = " + start_date + " / end date = " +
  end_date ) ;

  c.find({"nom":nom,"starttime":start_date,"endtime":end_date},{},function(e,event){
    if(event ==''){
      res.json("event don't exist ");
    }  
    else{

      res.json(event[0]['_id']);
    }
    
    });
});


 // route convert any date  .

 // Thu Jun 03 2021 06:25:00 GMT+0100 (West Africa Standard Time)


 
router.get('/api/getDate/:date' , function(req, res) {

  const date = require('date-and-time');

 // var date_test = "Thu Jun 03 2021 06:25:00 GMT+0100 (West Africa Standard Time)";
  
 date_req = req.params.date ;

  const date_convert = new Date(date_req);
// date.parse('2015/01/02 23:14:05', 'YYYY/MM/DD HH:mm:ss');

var new_date = date.format(date_convert, 'YYYY-MM-DDTHH:mm');

  res.json(new_date) ;

 });



// find event by id and update
  

 
router.post('/api/modifier_event/:id', function(req, res, next) {
 
  var db = req.db ; 

  var c = db.get('events') ;   

 
  var new_event = { $set: {
     nom: req.body.nom ,
     starttime:req.body.starttime  ,
     endtime : req.body.endtime 
      } };


  c.findOneAndUpdate({"_id":req.params.id}, new_event ,{new : true},function(err,docs){

      if (err) {

        res.json(" erreur : event nom trouvée ");

      }

      else{

        res.json("event updated succesfully") ;
      
      }
  });
     

});


// delete event 

router.get('/api/deleteEvent/:id', function(req, res, next) {
 
  
  var db = req.db ; // localhost:27017/stock

  var c = db.get('events') ;   // selectionner la collection pc .
   
  c.remove({"_id":req.params.id},{},function(err,docs){


      if (err) {
        res.json(" erreur : event nom trouvée ");
      }

      else{

        res.json("event supprimé avec succés ");
      }

  });
     
  
  });


  // web socket part 

 
  

 // route select avec session.user_mail

 router.get('/api/getUserswithName/:nom', function(req, res) {

  var db =req.db;
  var c = db.get('users');  


  c.find({"nom":req.params.nom},{},function(e,user){
    if(user ==''){
      res.json("pas de user avec le nom " + req.params.nom );
    }
    else{

      res.json(user);
    }
    
    }); 

 });

   
  
 


module.exports = router;



