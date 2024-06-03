import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, tap } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7194/api/";
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  Login(model : any){
    return this.http.post<User>(this.baseUrl + "Account/Login", model).pipe(
      map((response: User) => {
        const user = response;
        if(user)
          {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
      })
    )
  }

  Register(model: any)
  {
    return this,this.http.post<User>(this.baseUrl + "Account/Register", model).pipe(
      map((response: User) => {
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

        return user;
      })
    )
  }

  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }

  Logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
