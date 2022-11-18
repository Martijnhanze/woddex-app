import {AppState} from "../states/app-state.interface";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {selectAllUsers, selectUserEntities} from "../states/users/user.reducer";
import * as UserActions from '../states/users/user.actions';

@Injectable()
export class UserRepository {

    private userEntities$ = this.store.select(selectUserEntities);
    private users$ = this.store.select(selectAllUsers);

    constructor(
        private store: Store<AppState>,
    ) {
    }

    loadAll(): void {
        this.store.dispatch(UserActions.loadAll());
    }

    getAll() {
        return this.users$;
    }
}
