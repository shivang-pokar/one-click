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
        const currentUser = this.firebase?.auth()?.currentUser;
        if (request.url.search(environment.API_BASE_URL) >= 0 && currentUser) {
            return from(currentUser?.getIdToken().then(token => {

                let modifiedBody = request.body;
                
                if (currentUser?.uid && (request.method === 'POST' || request.method === 'PUT')) {
                    if (!modifiedBody.createdBy) {
                        modifiedBody = {
                            ...modifiedBody,
                            createdBy: currentUser.uid
                        };
                    } else {
                        modifiedBody = {
                            ...modifiedBody,
                            updatedBy: currentUser.uid
                        };
                    }
                }

                return request.clone({
                    setHeaders: {
                        authorization: `${token}`
                    },
                    body: modifiedBody
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