import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
  
})
export class CanActivateWarningGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const currentUrl = state.url;
    if (currentUrl === '/blog' || currentUrl === '/contact') {
      this.toastr.warning('En próximas actualizaciones se agregará.', 'Warning');
      return false; // Prevent navigation
    }
    return true; // Allow navigation
  }
}