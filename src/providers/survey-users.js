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
export var SurveyUsers = (function () {
    function SurveyUsers(http) {
        this.http = http;
        this.surveyUrl = 'http://192.168.178.40:4567';
    }
    // Load all survey users
    SurveyUsers.prototype.load = function () {
        return this.http.get(this.surveyUrl + "/getAllUsers/")
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
        __metadata('design:paramtypes', [Http])
    ], SurveyUsers);
    return SurveyUsers;
}());
//# sourceMappingURL=survey-users.js.map