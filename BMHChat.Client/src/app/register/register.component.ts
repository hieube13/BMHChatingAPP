import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // model: any = {};
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup
  maxDate!: Date
  validationErrors: string[] = [];

  constructor(
    private accountService:AccountService,
    private toast:ToastrService,
    private fb: FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
      this.initializeForm();
      this.maxDate = new Date();
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm()
  {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knowAs: ['', Validators.required],
      dateOfbirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchValues(matchTo: string) : ValidatorFn
  {
    return (control: AbstractControl) => {
      const parent = control?.parent;
      if (!parent) {
        return null;
      }

      const matchControl = parent.get(matchTo);
      if (!matchControl) {
        return null;
      }

      return control.value === matchControl.value ? null : { isMatching: true };
    }
  }


  Register()
  {
    this.accountService.Register(this.registerForm.value).subscribe(res => {
      // console.log(res);
      // this.Cancel();
      this.router.navigateByUrl('/members');
    },error => {
      // this.toast.error(error.error);
      this.validationErrors = error
    });
  }

  Cancel()
  {
    this.cancelRegister.emit(false);
  }
}
