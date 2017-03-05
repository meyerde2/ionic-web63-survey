var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { GlobalVarService } from './global-var-service';
import { SurveyUsers } from './survey-users';
export var User = (function () {
    function User(username, password, applicationServer) {
        this.username = username;
        this.password = password;
        this.applicationServer = applicationServer;
    }
    return User;
}());
export var Login = (function () {
    function Login(http, storage, globalVars, surveyUsers) {
        this.http = http;
        this.storage = storage;
        this.globalVars = globalVars;
        this.surveyUsers = surveyUsers;
        this.surveyUrl = '';
        console.log('Hello Login Provider');
    }
    Login.prototype.login = function (credentials) {
        var _this = this;
        this.globalVars.loginState = true;
        console.log(" - - -- GLOBAL - - -- - - -" + this.globalVars.loginState);
        console.log("credentials:_________________: " + JSON.stringify(credentials));
        if (credentials.username === null || credentials.password === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            console.log("else" + credentials.username);
            console.log("applicationServer:   " + credentials.applicationServer);
            return Observable.create(function (observer) {
                // At this point make a request to your backend to make a real check!
                //let access = (credentials.password === "password" && credentials.email === "batman");
                var headers = new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                });
                _this.currentUser = new User(credentials.username, credentials.password, credentials.applicationServer);
                _this.globalVars.ipAddress = _this.currentUser.applicationServer;
                _this.globalVars.username = _this.currentUser.username;
                console.log(credentials.username + "--------" + credentials.applicationServer + " - - -- GLOBAL - - -IP!!!!!!!!!!!!!!!!!!!!- - - -" + _this.globalVars.ipAddress);
                _this.surveyUrl = 'http://' + _this.globalVars.ipAddress;
                console.log(_this.surveyUrl + "/appLogin/");
                _this.http.post(_this.surveyUrl + "/appLogin/", JSON.stringify(_this.currentUser), { headers: headers })
                    .map(function (res) { return res.json(); }, function (error) {
                    console.error("Error creating user!");
                    return Observable.throw(error);
                }).subscribe(function (data) {
                    console.log("Result-Data:  " + JSON.stringify(data));
                    _this.access = data;
                    console.log("access:   " + JSON.stringify(_this.access));
                    if (_this.access) {
                        console.log("Login erfolgreich");
                        _this.storage.set('username', _this.currentUser.username).then(function () {
                            console.log('username has been set');
                            _this.storage.get('username').then(function (username) {
                                console.log('usernameLocalstorage: ' + username);
                            });
                        });
                        _this.surveyUsers.loadDetails(_this.globalVars.username).subscribe(function (data) {
                            _this.globalVars.userRole = data.role;
                            console.log("this.globalVars.userRole::: " + _this.globalVars.userRole);
                        });
                    }
                    else {
                        console.log("Login fehlgeschlagen");
                    }
                    observer.next(_this.access);
                    observer.complete();
                });
            });
        }
    };
    Login.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            return Observable.create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    Login.prototype.getIpAddress = function () {
        console.log("this.ipAddress ___________: " + this.ipAddress);
        return this.ipAddress;
    };
    Login.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    Login.prototype.logout = function () {
        this.currentUser = null;
        this.storage.clear();
        console.log("ausgeloggt");
    };
    Login = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Storage, GlobalVarService, SurveyUsers])
    ], Login);
    return Login;
}());
//# sourceMappingURL=login.js.map