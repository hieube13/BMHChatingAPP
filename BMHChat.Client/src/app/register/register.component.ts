import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService:AccountService,
    private toast:ToastrService
  ){}

  ngOnInit(): void {
      
  }

  Register()
  {
    this.accountService.Register(this.model).subscribe(res => {
      console.log(res);
      this.Cancel();
    },error => {
      this.toast.error(error.error);
    });
  }

  Cancel()
  {
    this.cancelRegister.emit(false);
  }
}
