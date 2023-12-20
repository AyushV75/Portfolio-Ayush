/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs= require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/mywebsite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
   });

//    get expression session
// const session = require('express-session');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//  console.log("Connected to MongoDB!!");
// });
 
app.set('views', path.join(__dirname, 'views'));
//use public folder for CSS etc.
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');


// app.use(session({
//     secret: 'superrandomsecret',
//     resave: false,
//     saveUninitialized: true
// }));

const filePath = path.join(__dirname, 'Resume/AyushVekariya_Resume.pdf');

app.get('/pdf', (req, res) => {
  res.sendFile(filePath);
});

// Contact page
app.get('/contact',function (req, res){
    res.render( 'contact.ejs');
});
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: {type :String,required:true},

  });
  
  const Contact = mongoose.model('Contact', contactSchema);
app.post('/contact', async (req,res)=>{
    const newContact=new Contact({
        name : req.body.name ,
        phone : req.body.phone,
        email : req.body.email,
        message : req.body.message,
    });

     // Save the new contact to the database
     try {
        // Save the new contact to the database
        await newContact.save();
        console.log("Saved");
        res.redirect('/contact');
      } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            console.error(error.message);
            res.render('contact', { error: 'Name and Phone are required fields' });
          } else {
            // Handle other errors
            console.error(error);
            res.send('Error saving contact');
          }
        }
});

// app.get('/contacts', async (req, res) => {
//     try {
//       const contacts = await Contact.find();
//       console.log(contacts);
//       res.render('contacts', { contacts });
//     } catch (error) {
//       console.error(error);
//       res.send('Error fetching contacts');
//     }
//   });

// Index Page
app.get('/',function (req, res){
    res.render( 'index.ejs');
});

// Projects page
app.get('/projects',function (req, res){
    res.render( 'projects.ejs');
});

// Resume Page
app.get('/resume',function (req, res){
    res.render( 'resume.ejs');
});
// const Contact = mongoose.model('Contact',{
//     name: String,
//     email: String
// });

// app.post('/contact', function(req, res) {
//     // The form data will be in the request body
//     // console.log(req.body);

//     // // Assuming the form data includes 'name' and 'email'
//     // const { name, email } = req.body;

//     // Now, you can store this data in MongoDB using Mongoose
//     // Define a new Mongoose schema for the data
//     const name = req.body.name;
//     const phone = req.body.phone;
//     const userSchema = new mongoose.Schema({
//         name: String,
//         phone: String
//     });

//     // // Create a new Mongoose model based on the schema
//     const contact = mongoose.model('contact', userSchema);
    
//     // Create a new User instance and save it to the database
//     const newContact= new contact({
//         name : name,
//         phone: phone
        
//     });
//     newContact.save().then(function(){

//         console.log('New contact created');
//     });
//         //    var name = req.body.name;
//         //    var email = req.body.email;

//         //     var pageData = {
//         //         name : name,
//         //         email : email
//         //     }
//         //     var myContact= new Contact(pageData);
//         //     myContact.save().then(function(){
//         //         console.log('New contact created');
//         //     });
//         //     res.send('Contact information received!');
//         //     res.render('contact', pageData);
// });

// app.post('/contact', function(req, res) {
//     var name = req.body.name;
//     var email = req.body.email;

//     var pageData = {
//         name : name,
//         email : email
//     }
//     var myContact= new Contact(pageData);
//     myContact.save().then(function(){
//         console.log('New contact created');
        
//     }).catch(err => {
//         console.log(err);
//         res.status(500).send('Something went wrong');
//     });
// });

       

app.listen(2025);
console.log("Server is running at http://localhost:2025");
