import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanOfficerService } from 'src/app/services/loan-officer/loan-officer.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-add-loan-officer',
  templateUrl: './add-loan-officer.component.html',
  styleUrls: ['./add-loan-officer.component.css']
})
export class AddLoanOfficerComponent {
  userForm: FormGroup;


  constructor(private fb: FormBuilder,
     private loginService: LoginService, 
     private router: Router ,
     private loanOfficerService: LoanOfficerService
    
    ) {
    this.userForm = this.fb.group({
      username: new FormControl(
        '',
        [Validators.required, Validators.email],
        // [checkUniqueFields(this.loanOfficerService)] // Async Validator for Username
      ),
      password: new FormControl ('', [
        Validators.required,
        // Validators.pattern(
        //   '^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$'
        // )
      ]),
      firstName: new FormControl('', [
        Validators.required,
        // Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$")
      ]),
      lastName: new FormControl
      ('', [
        Validators.required,
        // Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$")
      ]),
      contactNumber: new FormControl('', [
        Validators.required,
      ],),
      pancardNumber: new FormControl(
        '',
        [Validators.required],
        // [checkUniqueFields(this.loanOfficerService)]
      ),
      dob: new FormControl(),
      // ('', [Validators.required]),
      // pancardNumber: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")
      // ]),
      gender: new FormControl()
    //   ('', [Validators.required])
    // });
  });
}
 


onSubmit() {
    if (this.userForm.valid) {
      this.loanOfficerService.AddLoanOfficers(this.userForm.value).subscribe( {
        next: (data) =>{ alert("Loan Officer added successfully");
        this.router.navigateByUrl('/admin/admindashboard');
      },  error: (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error && error.error.message) {
          alert(error.error.message); // Show the custom error message from the response
        } else {
          alert("An unexpected error occurred!"); // Fallback for other errors
        }
      },
    });
    } else {
      alert("Please fill out the form correctly.");
    }
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get contactNumber() {
    return this.userForm.get('contactNumber');
  }

  get pancardNumber() {
    return this.userForm.get('pancardNumber');
  }

  get dob() {
    return this.userForm.get('dob');
  }

  get gender() {
    return this.userForm.get('gender');
  }
}