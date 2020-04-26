import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class AdminGuard implements CanActivate{

    constructor( private loginService: LoginService,private router: Router){
    }

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
     state: import("@angular/router").RouterStateSnapshot): boolean 
     | import("@angular/router").UrlTree 
     | import("rxjs").Observable<boolean 
     | import("@angular/router").UrlTree> | Promise<boolean 
     | import("@angular/router").UrlTree> {
        const isAdmin=this.loginService.getIsAdmin();
        const isAuth=this.loginService.getIsAuth();
        console.log(isAdmin);
        console.log(isAuth);
        if(!isAdmin || !isAuth){
            this.router.navigate(['/login'])
        }else{
            return isAdmin;
        }

    }

}