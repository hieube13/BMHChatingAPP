import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, tap } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  Login(model : any){
    return this.http.post<User>(this.baseUrl + "/Account/Login", model).pipe(
      map((response: User) => {
        const user = response;
        if(user)
          {
            this.setCurrentUser(user);
          }
      })
    )
  }

  Register(model: any)
  {
    return this,this.http.post<User>(this.baseUrl + "/Account/Register", model).pipe(
      map((response: User) => {
        const user = response;
        if(user)
        {
          this.setCurrentUser(user);
        }

        return user;
      })
    )
  }

  setCurrentUser(user: User)
  {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  Logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
