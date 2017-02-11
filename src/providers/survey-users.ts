import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { SurveyUser } from '../models/surveyUser';

import { GlobalVarService } from './global-var-service';



@Injectable()
export class SurveyUsers {
    surveyUrl = '';
    username = '';
    constructor(public http: Http, public globalVars: GlobalVarService) {
        console.log('Hello Survey-User Provider');
        this.surveyUrl = 'http://' + this.globalVars.ipAddress;
    }

    // Load all survey users
    load(): Observable<SurveyUser[]> {
        this.username = this.globalVars.username;
        return this.http.get(`${this.surveyUrl}/getAllUsers/${this.username}/`)
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