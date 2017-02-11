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
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { GlobalVarService } from './global-var-service';
export var SurveyUsers = (function () {
    function SurveyUsers(http, globalVars) {
        this.http = http;
        this.globalVars = globalVars;
        this.surveyUrl = '';
        this.username = '';
        console.log('Hello Survey-User Provider');
        this.surveyUrl = 'http://' + this.globalVars.ipAddress;
    }
    // Load all survey users
    SurveyUsers.prototype.load = function () {
        this.username = this.globalVars.username;
        return this.http.get(this.surveyUrl + "/getAllUsers/" + this.username + "/")
            .map(function (res) { return res.json(); });
    };
    // Get survey user by providing login(username)
    SurveyUsers.prototype.loadDetails = function (username) {
        return this.http.get(this.surveyUrl + "/getUserByUsername/" + username + "/")
            .map(function (res) { return (res.json()); });
    };
    // create new user
    SurveyUsers.prototype.createUser = function (user) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        this.http.post(this.surveyUrl + "/createUser/", JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); }, function (error) {
            console.error("Error creating user!");
            return Observable.throw(error);
        }).subscribe();
    };
    // update user by username
    SurveyUsers.prototype.updateUser = function (user) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        this.http.put(this.surveyUrl + "/updateUser/" + user.username + "/", JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); }, function (error) {
            console.error("Error updating user!");
            return Observable.throw(error);
        }).subscribe();
    };
    SurveyUsers = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, GlobalVarService])
    ], SurveyUsers);
    return SurveyUsers;
}());
//# sourceMappingURL=survey-users.js.map