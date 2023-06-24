
# Project Title
This is a Website made by me for the Jaipur Metro Signal and Telecom Department.

# Tech Stack

**Client:** HTML,CSS,Javascript,React

**Server:** Node, Express,Mongo DB


## Features

- Login/Logout
- Add New User  
- Reset Password
- Mark Attendence
- Apply for leave  
- Google Sheet to list down faults in System  

## Working  

- User can login using 2 Methods either he can create his own id on the platform or login using google id.  
- There is a special email address admin@mail.com whose password is only know to the administrator and is given some special features like accepting the leave request. 
- To add a new user you have to provide name,email id and a password.  
- To mark attendence you have to click Mark attendence button and automatically the attendence will be marked of you. You can view in the list below.  
-  To apply for leave you have to specify you name and reason for leave. You can also delete your request. You can also view that you request is approved by administrator or not.  
- In faults option there will be a google sheet where if you have editing rights then you can edit that sheet else you will only be able to view that sheet.  
- In order to reset your password you have to click forgot password option.The specify your email and click next. After that click on Generate OTP and an OTP will be mailed to you on email id that you specified. The type the OTP and click verify. After you typed correct OTP you will have option to reset your password.


## Installation

To run in your machine

```bash
  git clone https://github.com/RonakSurana-2001/Jaipur-Metro-Signal-And-Telecom.git
  npm i
  npm run both
```
Make sure you have MongoDb compass installed in your system.    

The React App frontend will run on localhost:3000    

The React App backend will run on localhost:3001  
