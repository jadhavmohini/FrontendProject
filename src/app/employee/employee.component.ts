import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GlobalService } from '../services/GlobalService';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  @ViewChild('secondDialog')
  secondDialog!: TemplateRef<any>;
  submitted = false;
  EmployeeProfile: any = ['PHP', 'Angular', 'Node', 'MEAN']
  employeeForm: any;
  isRegister: boolean = false;
  maxDate: any;
  minDate: any;
  citylist: any;
  employeeLists: any;oldDate: any;
;
  modalOptions: NgbModalOptions;
  closeResult: any;
  fname: any;
  lname: any;
  email: any;
  Dob: any;
  city: any;
  address: any;
  phoneNumber: any;
  id: any;

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public fb: FormBuilder,
    private datePipe: DatePipe,
    public apiService: GlobalService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit(): void {
    this.citylist = [{
      id: 1,
      name: 'Mumbai',
    },
    {
      id: 2,
      name: 'Thane'
    },
    {
      id: 3,
      name: 'Gujarat'
    },
    {
      id: 4,
      name: 'Pune'
    }
    ]
    this.maxDate = new Date();
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.employeeForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      Dob: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]]
    });
    this.getEmployeeList();
  }
  // for open model popup function
  open(content: any) {
    this.submitted = false
    this.modalService.open(content, this.modalOptions).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
// model pop up dismiss function
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
// get all employee list function
  getEmployeeList() {
    let url = this.apiService.base_path_api() + 'employee/employeeList';
    this.http.get<any>(url).subscribe((data: any) => {
      if (data) {
        this.isRegister = true;
        this.employeeLists = data;
        console.log(this.employeeLists,":checkkk")
      }

    })
  }
  // edit details for binding data of particular employee
  edit(data: any) {
    this.id = data._id
    this.fname = data.firstname,
      this.lname = data.lastname,
      this.email = data.email,
      this.oldDate=data.dob,
      this.Dob = data.dob//(this.oldDate, 'YYYY-MM-DD'),
      this.city = data.city,
      this.address = data.address,
      this.phoneNumber = data.mobile


  }
  // logout function
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/')
  }
  // converted or transfer date format for fronted table display
  getDate(data: any) {
    if (data != undefined || data != '') {
      return this.datePipe.transform(data, 'YYYY-MM-dd')
    } else {
      return "-"
    }
  }
  // return from controller values
  get myForm() {
    return this.employeeForm.controls;
  }
  // add new employee function
  Submit() {
    this.submitted = true;
    console.log(this.employeeForm.value,"this.employeeForm.value",this.employeeForm.Dob.value)
    if (this.employeeForm.invalid) {
      return
    } else {
      let body = this.employeeForm.value
      console.log(body, "body")
      let url = this.apiService.base_path_api() + 'employee/addEmployee';
      this.http.post<any>(url, body).subscribe((data: any) => {
        console.log(data, "let check")
        if (data.length != 0) {
          this.toastr.success('Employee Added Successfully!', 'Success!');
          this.employeeForm.reset();
          this.modalService.dismissAll()
          this.ngOnInit()
        }
      })
    }

  }
  // employee update function
  update() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return
    } else {
      console.log(this.employeeForm.value.Dob,"lllllllllllllll")
      console.log(this.oldDate,"checkk",this.Dob)
      let body = {
        id: this.id,
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        Dob: this.employeeForm.value.Dob,
        city: this.city,
        address: this.address,
        phoneNumber: this.phoneNumber
      }
      console.log(body, "for update")
      let url = this.apiService.base_path_api() + 'employee/update';
      this.http.post<any>(url, body).subscribe((data: any) => {
        console.log(data, "let check for update")
        if (data.length != 0) {
          this.toastr.success('Employee Updated Successfully!', 'Success!');
          this.ngOnInit()
        }

      })
    }
  }
  // Employee Delete Function
  Delete(id: any) {
    let body = {
      id: id,
    }
    console.log(body, "for update")
    let url = this.apiService.base_path_api() + 'employee/remove';
    this.http.post<any>(url, body).subscribe((data: any) => {
      if (data.length != 0) {
        this.toastr.success('Employee Deleted Successfully!', 'Success!');
        this.ngOnInit()
      }

    })

  }
}
