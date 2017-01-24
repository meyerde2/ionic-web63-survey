import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
}