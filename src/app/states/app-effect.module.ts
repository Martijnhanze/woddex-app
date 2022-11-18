import {EffectsModule} from "@ngrx/effects";
import {UserEffect} from "./users/user.effect";

export const AppEffectModule = EffectsModule.forRoot([
    UserEffect,
]);
