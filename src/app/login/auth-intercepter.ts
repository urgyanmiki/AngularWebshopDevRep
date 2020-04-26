import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';


@Injectable()
export class AuthIntercepter implements HttpInterceptor{
    constructor(private loginService: LoginService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const loginToken = this.loginService.getToken();
        const loginRequest = req.clone({
            headers: req.headers.set('Authorization', loginToken)
        });
        return next.handle(req);

    }

}