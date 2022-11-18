import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from "../../states/app-state.interface";

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private store: Store<AppState>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.handle(err);
                }
            })
        );
    }


    private handle(err: HttpErrorResponse) {
        if (err.status === 404) {
            this.router.navigate(['/']);
        }
    }
}
