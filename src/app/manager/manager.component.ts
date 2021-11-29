import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../services/GlobalService';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  companyList: any = [];
  submitted: boolean = false;
  submittedData: boolean = false
  managerSignUpForm: any;
  managerLoginForm: any;
  isRegister: boolean = false;
  maxDate: any;
  minDate: any;
  constructor(private http: HttpClient, private router: Router,
    public fb: FormBuilder, private datePipe: DatePipe,
    public apiService: GlobalService,) { }

  ngOnInit(): void {
    this.companyList = [{
      Id: 1,
      Name: "Trishala"

    },
    {
      Id: 2,
      Name: "Shanti"
    },
    {
      Id: 3,
      Name: "F-31"
    }
    ]
    this.maxDate = new Date();
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.managerSignUpForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      Dob: ['', [Validators.required]],
      company: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [
        Validators.required, Validators.minLength(6),
        Validators.pattern(
          "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
        )
      ]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]]
    });
    this.managerLoginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
        Validators.required, Validators.minLength(6),
        Validators.pattern(
          "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
        )
      ]],
    });
  }
  get myForm() {
    return this.managerSignUpForm.controls;
  }
  get myloginForm() {
    return this.managerLoginForm.controls;
  }
  // add or register new manager function
  SubmitData() {
    this.submitted = true;
    if (this.managerSignUpForm.invalid) {
      return
    } else {
      let body = this.managerSignUpForm.value
      console.log(body, "body")
      let url = this.apiService.base_path_api() + 'manager/managerSignUp';
      this.http.post<any>(url, body).subscribe((data: any) => {
        console.log(data, "let check")
        if (data) {
          this.isRegister = false;
        }
      })
    }
  }
  // login by existing manager function
  loginData() {
    this.submittedData = true;
    let body = this.managerLoginForm.value
    console.log(body, "body")
    let url = this.apiService.base_path_api() + 'manager/managerLogin';
    this.http.post<any>(url, body).subscribe((data: any) => {
      console.log(data, "let check")
      if (data) {
        // set data to local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.Admin.email);
        localStorage.setItem("userId", data.Admin._id);
        this.router.navigate(["employee"])
      }

    })
  }
  registerManager() {
    this.isRegister = true
  }
  alreadyRegisterManager() {
    this.isRegister = false
  }
}
