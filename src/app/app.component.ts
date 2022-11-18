import {Component, OnInit} from '@angular/core';
import {UserRepository} from "./repositories/user.repository";
import {map, Observable} from "rxjs";
import {UserModel} from "./models/user.model";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    title = 'woddex-app';

    users$: Observable<UserModel[]>;
    foo$: Observable<PouleInterface>;

    constructor(
        private readonly http: HttpClient,
        private readonly userRepository: UserRepository
    ) { }

    ngOnInit() {
        this.userRepository.loadAll();
        this.users$ = this.userRepository.getAll();
        this.foo$ = this.foo();
    }

    foo() {
        return this.http.get('http://localhost:3000/users/foo').pipe(map(res => res as PouleInterface));
    }
}

interface PouleInterface {
    poule: {
        stand: standInterface[],
        title: string;
    }
}

interface standInterface {
    gespeeld: number,
    punten: number,
    rang: number,
    saldo: number,
    score: string,
    team: string,
    _nr: 1
}

