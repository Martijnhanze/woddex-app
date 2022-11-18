import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Service} from "./service";

@Injectable()
export class UserService extends Service {
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    /**
     * Route to get all available measure point types
     */
    getAll() {
        return this.http.get(`${this.api}/users`);
    }
}
