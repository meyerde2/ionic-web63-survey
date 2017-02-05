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
/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export var User = (function () {
    function User(username, password, applicationServer) {
        this.username = username;
        this.password = password;
        this.applicationServer = applicationServer;
    }
    return User;
}());
export var Login = (function () {
    function Login(http) {
        this.http = http;
        this.surveyUrl = 'http://192.168.178.40:4567';
        console.log('Hello Login Provider');
    }
    Login.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.username === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            console.log("else" + credentials.username);
            return Observable.create(function (observer) {
                // At this point make a request to your backend to make a real check!
                //let access = (credentials.password === "password" && credentials.email === "batman");
                var headers = new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                });
                _this.currentUser = new User(credentials.username, credentials.password, credentials.appplicationServer);
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
    Login.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    Login.prototype.logout = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    Login = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], Login);
    return Login;
}());
//# sourceMappingURL=login.js.map