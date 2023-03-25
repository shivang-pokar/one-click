import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.injector.get(AngularFireAuth);
        return from(auth.currentUser).pipe(
            switchMap(user => {
                if (user) {
                    // Add the user's ID token to the authorization header
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${user.getIdToken()}`
                        }
                    });
                }
                return next.handle(request);
            })
        );
    }
}