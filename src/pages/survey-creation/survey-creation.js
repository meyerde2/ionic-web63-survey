var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Surveys } from '../../providers/surveys';
export var SurveyCreationPage = (function () {
    function SurveyCreationPage(navCtrl, navParams, surveys, fb, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveys = surveys;
        this.fb = fb;
        this.viewCtrl = viewCtrl;
    }
    SurveyCreationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyCreationPage');
    };
    SurveyCreationPage.prototype.ngOnInit = function () {
        this.surveyForm = this.fb.group({
            'surveyTitle': '',
            'sessionId': false,
            'ipAddress': false
        });
    };
    SurveyCreationPage.prototype.createSurvey = function (value) {
        var _this = this;
        console.log(JSON.stringify(value));
        this.surveys.createSurvey(value).subscribe(function (data) {
            console.log("data:  Create new Survey: " + data);
            _this.viewCtrl.dismiss();
        });
    };
    SurveyCreationPage = __decorate([
        Component({
            selector: 'page-survey-creation',
            templateUrl: 'survey-creation.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, FormBuilder, ViewController])
    ], SurveyCreationPage);
    return SurveyCreationPage;
}());
//# sourceMappingURL=survey-creation.js.map