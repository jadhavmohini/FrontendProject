

## Pre-requisites;
Angular CLI,
Node,
MongoDB,
Typescript


## Steps to run Frontend;
Take a clone of git repository and open project in Visual studio 
npm install
Open git bash terminal then pass command for Run `ng serve`
after compiled successfully 
 Navigate to `http://localhost:4200/`.

 ## Steps after run Frontend Project
 - first you see Login page
 - if You are First `User/Manager` then click on `REGISTER` Text
 - Open `Registration/Sign Up` form for Manager
 - Fill All details of form (`First Name,Last Name,Email,Address,Date of Birth,Password,Company Name,Mobile No.`) 
 then click on save Button
 - after Successfully Save all details Its go to login form
 - In Login Form you Have to add Email and Password (must be same as you enter for sign up form)
 - after LoggedIn Successfully By Manager It will show you Employee List page
 - Employee List page -(shows you all employees which will be added by manager)
 - manager can add new employee for that you have to click Add Employee Button
 - after click on add employee button the model pop up will be open
 - fill all details of  employee (`First Name,Last Name,Email,Address,Date of Birth,City,Phone`)
 - after click on save button employee will be added successfully
 - it will be come to employee list page show you all employee
 - if manager want to edit details of employee click on edit button it will be open edit details form on pop up model
 - manager want to edit then it will be edit that employee details or else come to employee list page
 - if manager want to delete employee click on delete button from employee list popup will open to make sure you want to delete or not if yes then click on Yes button
 - employee will be deleted successfully ( `Note: employee soft delete from database`)
 

## Browser link
http://localhost:4200

## Steps to run Backend project (Server);
Take a clone of git repository and open project in Visual studio 
- `npm install`
- `npm start`
 

## Steps for server requests or connection
- In Node js project First Added MongoDb connection
- created Controller File where write api 
path 
     - `src/data/employee.js`
     - `src/data/manager.js`
- added this files into routes file i.e index.js
- created model file for database structure 
path 
     - `dataModel/employeeModel.js`
     - `dataModel/managerModel.js`

