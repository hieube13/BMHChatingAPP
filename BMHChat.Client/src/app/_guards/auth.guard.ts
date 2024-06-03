import { User } from './../_models/user';
import { inject } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, map, tap } from 'rxjs';
import { Route, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _accountService = inject(AccountService);
  const _toastr = inject(ToastrService)
  const _router = inject(Router);

  return _accountService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } 
      else {
        _toastr.error('You shall not pass!');
        return false;
      }
    })
  );
};
