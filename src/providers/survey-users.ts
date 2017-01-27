import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { SurveyUser } from '../models/surveyUser';

@Injectable()
export class SurveyUsers {
    surveyUrl = 'http://192.168.178.40:4567';

    constructor(public http: Http) { }

    // Load all survey users
    load(): Observable<SurveyUser[]> {
        return this.http.get(`${this.surveyUrl}/getAllUsers/`)
            .map(res => <SurveyUser[]>res.json());
    }

    // Get survey user by providing login(username)
    loadDetails(username: string): Observable<SurveyUser> {
        return this.http.get(`${this.surveyUrl}/getUserByUsername/${username}/`)
            .map(res => <SurveyUser>(res.json()))
    }

    // create new user
    createUser(user: SurveyUser) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        this.http.post(`${this.surveyUrl}/createUser/`, JSON.stringify(user), { headers: headers })
            .map(res => <SurveyUser[]>res.json(),
            error => {
                console.error("Error creating user!");
                return Observable.throw(error);
            }).subscribe();

    }

    // update user by username
    updateUser(user: SurveyUser) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        this.http.put(`${this.surveyUrl}/updateUser/${user.username}/`, JSON.stringify(user), { headers: headers })
            .map(res => <SurveyUser[]>res.json(),
            error => {
                console.error("Error updating user!");
                return Observable.throw(error);
            }).subscribe();
    }

}