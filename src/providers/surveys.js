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
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
export var Surveys = (function () {
    function Surveys(http) {
        this.http = http;
        this.surveyUrl = 'http://localhost:4567';
        console.log('Hello Survey Provider');
    }
    // Load all surveys
    Surveys.prototype.load = function () {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
        });
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.surveyUrl + "/getAllSurveyEntries/")
            .map(function (res) { return res.json(); });
    };
    // Load all surveys
    Surveys.prototype.putSurvey = function () {
        var username = "myusernameJunge";
        var password = "pw";
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
        });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('hashedPassword', password);
        var data = JSON.stringify({ username: 'CHEFFE' });
        var body = urlSearchParams.toString();
        return this.http.put(this.surveyUrl + "/updateSurvey/15/", data, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Get survey by id
    Surveys.prototype.loadDetails = function (id) {
        return this.http.get(this.surveyUrl + "/getSurveyById/" + id + "/")
            .map(function (res) { return (res.json()); });
    };
    Surveys = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], Surveys);
    return Surveys;
}());
//# sourceMappingURL=surveys.js.map