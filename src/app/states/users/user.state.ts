import {EntityState} from '@ngrx/entity';
import {UserModel} from "../../models/user.model";

export interface UserState extends EntityState <UserModel> {
    isLoading: boolean;
    hasLoaded: boolean;
}

