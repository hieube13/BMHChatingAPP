// import { CanActivateFn } from '@angular/router';

// export const preventUnsavedChangesGuard: CanActivateFn = (route, state) => {

//   return true;
// };

import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (
  component: MemberEditComponent
) => {
  if (component) {
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
  }
  return true;
};


