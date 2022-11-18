import {NgModule} from "@angular/core";
import {UserRepository} from "./user.repository";

@NgModule({
    providers: [
        UserRepository,
    ]
})
export class RepositoryModule {
}

