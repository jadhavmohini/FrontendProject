import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './GlobalService';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private global_service: GlobalService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('token') != null) {
            return true
        } else {
            this.router.navigateByUrl('/manager');
            return false
        }
    }
}