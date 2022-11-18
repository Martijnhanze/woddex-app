import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from './user.actions';
import {catchError, map, mergeMap, of} from "rxjs";
import {UserService} from "../../services/user.service";
import {Injectable} from "@angular/core";
import {UserModel} from "../../models/user.model";
import {Res} from "../../interfaces/response";

@Injectable()
export class UserEffect {
    constructor(
        private action$: Actions,
        private userService: UserService) {
    }

    loadAll$ = createEffect(() =>
        this.action$.pipe(
            ofType(UserActions.loadAll),
            mergeMap(() => this.userService.getAll().pipe(
                map((response) => {
                    return UserActions.loadAllSuccess({users: response as UserModel[]});
                }),
                catchError(() => of(UserActions.loadAllError))
            ))
        )
    );
}
