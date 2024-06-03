import { Observable } from 'rxjs';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
  loggedIn: boolean = false;
  // currentUser$!: Observable<User | null>;

  constructor(
    public accountService:AccountService, 
    private router:Router, 
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;
  }   

  Login()
  {
    this.accountService.Login(this.model).subscribe(res => {
      this.router.navigateByUrl('/members'); 
    }, error => {
      this.toastr.error(error.error);
    });
  }

  logout()
  {
    this.accountService.Logout();
    this.router.navigateByUrl('/'); 
  }


}
