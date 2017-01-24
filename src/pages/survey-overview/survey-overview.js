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
import { NavController, NavParams } from 'ionic-angular';
import { Surveys } from '../../providers/surveys';
import { SurveyDetailsPage } from '../survey-details/survey-details';
/*
  Generated class for the SurveyOverview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var SurveyOverviewPage = (function () {
    function SurveyOverviewPage(navCtrl, navParams, surveysProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveysProvider = surveysProvider;
        surveysProvider.load().subscribe(function (surveys) {
            _this.surveys = surveys;
            console.log(surveys);
        });
    }
    SurveyOverviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyOverviewPage');
    };
    SurveyOverviewPage.prototype.goToSurveyDetails = function (id) {
        this.navCtrl.push(SurveyDetailsPage, { id: id });
    };
    SurveyOverviewPage = __decorate([
        Component({
            selector: 'page-survey-overview',
            templateUrl: 'survey-overview.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys])
    ], SurveyOverviewPage);
    return SurveyOverviewPage;
}());
//# sourceMappingURL=survey-overview.js.map