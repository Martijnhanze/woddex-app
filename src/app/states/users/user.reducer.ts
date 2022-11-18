import {createEntityAdapter, Dictionary} from "@ngrx/entity";
import {UserModel} from "../../models/user.model";
import {UserState} from "./user.state";
import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as UserActions from './user.actions'
import {StateHelpers} from "../../utils/state-helpers";

const userAdapter = createEntityAdapter<UserModel>();

const initialState: UserState = userAdapter.getInitialState({
    isLoading: false,
    hasLoaded: false,
});

const UserReducer = createReducer(
    initialState,
    on(UserActions.loadAll, (state) => {
        return {
            ...state,
            ...StateHelpers.loading
        };
    }),
    on(UserActions.loadAllSuccess, (state, {users}) => {
        return {
            ...userAdapter.addMany(users, state),
            ...StateHelpers.success
        };
    }),
    on(UserActions.loadAllError, (state) => {
        return {
            ...state,
            ...StateHelpers.error
        };
    })
)

export function reducer(state: UserState, action: Action) {
    return UserReducer(state, action);
}


export const selectUsers = createFeatureSelector<UserState>('users');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = userAdapter.getSelectors(selectUsers);

export const selectAllUsers = selectAll;
export const selectUserEntities = selectEntities;

export const selectUserById = (id: number) => createSelector(
    selectEntities,
    (entities: Dictionary<UserModel>) => entities.hasOwnProperty(id) ? entities[id] : null
);
