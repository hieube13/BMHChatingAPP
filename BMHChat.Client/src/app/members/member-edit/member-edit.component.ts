import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user!: User
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService, 
    private membersService: MembersService,
    private toastr: ToastrService
  )
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user!;
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
    this.membersService.getMember(this.user.username).subscribe(member => {
      this.member = member
    })
  }

  updateMember()
  {
    this.membersService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully')
      this.editForm.reset(this.member);
    });
  }
}
