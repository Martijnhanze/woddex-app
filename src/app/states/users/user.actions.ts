import {createAction, props} from '@ngrx/store';
import {UserModel} from "../../models/user.model";

const prefix = `['USERS']`;

export const loadAll = createAction(`${prefix} Load all`);
export const loadAllSuccess = createAction(`${prefix} Load all success`, props<{ users: UserModel[] }>());
export const loadAllError = createAction(`${prefix} Load al error`);

