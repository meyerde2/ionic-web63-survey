import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { SurveyUser } from '../models/surveyUser';

import { Storage } from '@ionic/storage';
import * as LocalForage from 'localforage'

import { GlobalVarService } from './global-var-service';
import { SurveyUsers } from './survey-users';

export class User {
    public username: string;
    public password: string;
    public applicationServer: string;

    constructor(username: string, password: string, applicationServer: string) {
        this.username = username;
        this.password = password;
        this.applicationServer = applicationServer;
    }
}

@Injectable()
export class Login {
    
    public currentUser: User;
    surveyUrl = '';
    access: boolean;
    ipAddress: string;


    constructor(public http: Http, public storage: Storage, public globalVars: GlobalVarService, public surveyUsers: SurveyUsers) {
        console.log('Hello Login Provider');
    }

    public login(credentials) {

        this.globalVars.loginState = true;

        console.log(" - - -- GLOBAL - - -- - - -"+ this.globalVars.loginState);

        console.log("credentials:_________________: " + JSON.stringify(credentials));

        if (credentials.username === null || credentials.password === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {

            console.log("else" + credentials.username);

            console.log("applicationServer:   " + credentials.applicationServer);


            return Observable.create(observer => {
                // At this point make a request to your backend to make a real check!
                //let access = (credentials.password === "password" && credentials.email === "batman");

                let headers = new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                });

                this.currentUser = new User(credentials.username, credentials.password, credentials.applicationServer);


                this.globalVars.ipAddress = this.currentUser.applicationServer;
                this.globalVars.username = this.currentUser.username;


                console.log(credentials.username + "--------" + credentials.applicationServer + " - - -- GLOBAL - - -IP!!!!!!!!!!!!!!!!!!!!- - - -" + this.globalVars.ipAddress);

                this.surveyUrl = 'http://' + this.globalVars.ipAddress;

                console.log(`${this.surveyUrl}/appLogin/`);

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

                            this.storage.set('username', this.currentUser.username).then(() => {
                                console.log('username has been set');
                                this.storage.get('username').then((username) => {
                                    console.log('usernameLocalstorage: ' + username);
                                });
                            });

                            this.surveyUsers.loadDetails(this.globalVars.username).subscribe(data => {
                                this.globalVars.userRole = data.role;
                                console.log("this.globalVars.userRole::: " + this.globalVars.userRole);
                            });
                            
                            
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

    public getIpAddress(): string {
        console.log("this.ipAddress ___________: " + this.ipAddress);
        return this.ipAddress;
    }

    public getUserInfo(): User {
        return this.currentUser;
    }

    public logout() {

        this.currentUser = null;
        this.storage.clear();
        console.log("ausgeloggt");
    }
}
