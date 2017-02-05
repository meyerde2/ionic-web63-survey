import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { SurveyUser } from '../models/surveyUser';
/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
    username: string;
    password: string;
    applicationServer: string;

    constructor(username: string, password: string, applicationServer: string) {
        this.username = username;
        this.password = password;
        this.applicationServer = applicationServer;
    }
}


@Injectable()
export class Login {

    currentUser: User;
    surveyUrl = 'http://192.168.178.40:4567';
    access: boolean;

    constructor(public http: Http) {
        console.log('Hello Login Provider');
    }

    public login(credentials) {
        if (credentials.username === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {

            console.log("else" + credentials.username);
            return Observable.create(observer => {
                // At this point make a request to your backend to make a real check!
                //let access = (credentials.password === "password" && credentials.email === "batman");

                let headers = new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                });
                this.currentUser = new User(credentials.username, credentials.password, credentials.appplicationServer);

                
                this.http.post(`${this.surveyUrl}/appLogin/`, JSON.stringify(this.currentUser), { headers: headers })
                    .map(res => <boolean>res.json(),
                    error => {
                        console.error("Error creating user!");
                        return Observable.throw(error);
                    }).subscribe(data => {
                        console.log("Result-Data:  " + JSON.stringify(data));
                        this.access = data;


                        console.log("access:   " + JSON.stringify(this.access));

                        if (this.access) {
                            console.log("Login erfolgreich");
                        } else {
                            console.log("Login fehlgeschlagen");

                        }

                        observer.next(this.access);
                        observer.complete();

                    });

            });
        }
    }

    public register(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            // At this point store the credentials to your backend!
            return Observable.create(observer => {
                observer.next(true);
                observer.complete();
            });
        }
    }

    public getUserInfo(): User {
        return this.currentUser;
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }


}
