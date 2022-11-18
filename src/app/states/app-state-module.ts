import {MetaReducer, StoreModule} from "@ngrx/store";
import * as fromUsers from './users/user.reducer';
import {AppState} from "./app-state.interface";
import {environment} from "../../environments/environment";

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const AppStateModule = StoreModule.forRoot({
    users: fromUsers.reducer,
}, {
    metaReducers,
    runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
    }
});

