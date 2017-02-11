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
import { Surveys } from '../../providers/surveys';
export var SurveyRemovingPage = (function () {
    function SurveyRemovingPage(navCtrl, navParams, surveys, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveys = surveys;
        this.viewCtrl = viewCtrl;
        this.surveyId = 0;
        this.surveyId = navParams.get('id');
        console.log("constructor survey:  " + this.surveyId);
    }
    SurveyRemovingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyRemovingPage');
    };
    SurveyRemovingPage.prototype.submitRemoving = function (id) {
        console.log("l�schen..." + id);
        //
        //this.navCtrl.popTo(SurveyOverviewPage);
        this.surveys.deleteSurvey(id).subscribe();
        this.viewCtrl.dismiss();
    };
    SurveyRemovingPage = __decorate([
        Component({
            selector: 'page-survey-removing',
            templateUrl: 'survey-removing.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, ViewController])
    ], SurveyRemovingPage);
    return SurveyRemovingPage;
}());
//# sourceMappingURL=survey-removing.js.map