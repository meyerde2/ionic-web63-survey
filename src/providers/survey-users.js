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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
export var SurveyUsers = (function () {
    function SurveyUsers(http) {
        this.http = http;
        this.surveyUrl = 'http://localhost:4567';
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
    SurveyUsers = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], SurveyUsers);
    return SurveyUsers;
}());
//# sourceMappingURL=survey-users.js.map