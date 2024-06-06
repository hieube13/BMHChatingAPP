import { Member } from 'src/app/_models/member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers()
  {
    if(this.members,length > 0) return of(this.members);

    return this.http.get<Member[]>(this.baseUrl + '/Users').pipe(
      map((members: Member[]) => {
        this.members = this.members;
        return members;
      })
    )
  }

  getMember(userName : string) : Observable<Member>
  {
    const member = this.members.find(x => x.userName === userName);
    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + '/Users/' + userName)
  }

  updateMember(member : Member)
  {
    return this.http.put(this.baseUrl + '/Users/', member).pipe(
      map(() => {
        const index = this.members.indexOf(member); 
        this.members[index] = member;
      })
    );
  }

  SetMainPhoto(photoId: number)
  {
    return this.http.put(this.baseUrl + '/Users/set-main-photo/' + photoId, {});
  }

  DeletePhoto(photoId: number)
  {
    return this.http.delete(this.baseUrl + '/Users/delete-photo/' + photoId);
  }
}
