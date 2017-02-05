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
import { Observable } from 'rxjs/Rx';
export var Surveys = (function () {
    function Surveys(http) {
        this.http = http;
        //surveyUrl = 'http://192.168.178.40:4567';
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
        console.log("putSurvey!!!!!!!!!!!!");
        return this.http.put(this.surveyUrl + "/updateSurvey/15/", body)
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.updateSurveyEntry = function (survey) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        console.log("survey provider: " + JSON.stringify(survey));
        console.log("URL: " + (this.surveyUrl + "/updateSurvey/" + survey.surveyId + "/"));
        console.log("survey.surveyId:  " + survey.surveyId);
        if (survey.surveyId != undefined && survey.surveyId > 0) {
            this.http.put(this.surveyUrl + "/updateSurvey/" + survey.surveyId + "/", JSON.stringify(survey), { headers: headers })
                .map(function (res) { return res.json(); }, function (error) {
                console.error("error updating survey!");
                return Observable.throw(error);
            }).subscribe();
            console.log("URL: " + (this.surveyUrl + "/updateSurvey/" + survey.surveyId + "/"));
        }
        else {
            console.log("Update not executed");
        }
    };
    // Get survey by id
    Surveys.prototype.loadDetails = function (id) {
        return this.http.get(this.surveyUrl + "/getSurveyById/" + id + "/")
            .map(function (res) { return (res.json()); });
    };
    // Get survey elements by surveyId
    Surveys.prototype.loadSurveyElementsBySurveyID = function (id) {
        return this.http.get(this.surveyUrl + "/getSurveyElementsById/" + id + "/")
            .map(function (res) { return (res.json()); });
    };
    //******************************//
    // get different element data
    //******************************//
    Surveys.prototype.loadTextDetailsById = function (surveyId, elementId, elementType) {
        return this.http.get(this.surveyUrl + "/survey/" + surveyId + "/element/" + elementId + "/elementtype/" + elementType + "/")
            .map(function (res) { return (res.json()); });
    };
    Surveys.prototype.loadPersonalDataById = function (surveyId, elementId, elementType) {
        return this.http.get(this.surveyUrl + "/survey/" + surveyId + "/element/" + elementId + "/elementtype/" + elementType + "/")
            .map(function (res) { return (res.json()); });
    };
    Surveys.prototype.loadClosedQuestionDetailsById = function (surveyId, elementId, elementType) {
        return this.http.get(this.surveyUrl + "/survey/" + surveyId + "/element/" + elementId + "/elementtype/" + elementType + "/")
            .map(function (res) { return (res.json()); });
    };
    Surveys.prototype.loadOpenQuestionDetailsById = function (surveyId, elementId, elementType) {
        return this.http.get(this.surveyUrl + "/survey/" + surveyId + "/element/" + elementId + "/elementtype/" + elementType + "/")
            .map(function (res) { return (res.json()); });
    };
    Surveys.prototype.loadScoreTableDetailsById = function (surveyId, elementId, elementType) {
        return this.http.get(this.surveyUrl + "/survey/" + surveyId + "/element/" + elementId + "/elementtype/" + elementType + "/")
            .map(function (res) { return (res.json()); });
    };
    Surveys.prototype.createTextElement = function (text) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        console.log("before put request");
        return this.http.put(this.surveyUrl + "/jsonTextupload/", JSON.stringify(text), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.updateTextElement = function (text) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonTextuploadUpdate/", JSON.stringify(text), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.createPersonalDataElement = function (personalData) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonPersonaldata/", JSON.stringify(personalData), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.updatePersonalDataElement = function (personalData) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonPersonaldataUpdate/", JSON.stringify(personalData), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.createClosedQuestionElement = function (closedQuestion) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonClosedQuestion/", JSON.stringify(closedQuestion), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.updateClosedQuestionElement = function (closedQuestion) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonClosedQuestionUpdate/", JSON.stringify(closedQuestion), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.createOpenQuestionElement = function (openQuestion) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonOpenQuestion/", JSON.stringify(openQuestion), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.updateOpenQuestionElement = function (openQuestion) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonOpenQuestionUpdate/", JSON.stringify(openQuestion), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.createScoreTableElement = function (scoreTable) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonScoreTable/", JSON.stringify(scoreTable), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys.prototype.updateScoreTableElement = function (scoreTable) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return this.http.put(this.surveyUrl + "/jsonScoreTableUpdate/", JSON.stringify(scoreTable), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Surveys = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], Surveys);
    return Surveys;
}());
//# sourceMappingURL=surveys.js.map