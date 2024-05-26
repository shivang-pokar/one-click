import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    firebase = firebase.default;
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.search(environment.API_BASE_URL) >= 0 && this.firebase?.auth()?.currentUser) {
            return from(this.firebase?.auth()?.currentUser?.getIdToken().then(token => {
                return request.clone({
                    setHeaders: {
                        authorization: `${token}`
                    }
                });
            }).catch(er => {
                return request;
            })).pipe(switchMap(req => {
                return next.handle(req);
            }))
        }
        else {
            return next.handle(request);
        }
    }
}