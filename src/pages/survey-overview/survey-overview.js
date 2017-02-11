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
import { ModalController } from 'ionic-angular';
import { Surveys } from '../../providers/surveys';
import { SurveyDetailsPage } from '../survey-details/survey-details';
import { SurveyCreationPage } from '../survey-creation/survey-creation';
export var SurveyOverviewPage = (function () {
    function SurveyOverviewPage(navCtrl, navParams, surveysProvider, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveysProvider = surveysProvider;
        this.modalCtrl = modalCtrl;
        this.surveysProvider.getUsername();
    }
    SurveyOverviewPage.prototype.ngOnInit = function () {
        var _this = this;
        this.surveysProvider.load().subscribe(function (data) {
            _this.surveys = data;
            console.log(JSON.stringify(data));
        });
    };
    SurveyOverviewPage.prototype.ngAfterViewInit = function () {
    };
    SurveyOverviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyOverviewPage');
    };
    SurveyOverviewPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter SurveyOverviewPage');
        this.ngOnInit();
    };
    SurveyOverviewPage.prototype.goToSurveyDetails = function (id) {
        this.navCtrl.push(SurveyDetailsPage, { id: id });
    };
    SurveyOverviewPage.prototype.goToNewSurvey = function () {
        var _this = this;
        var modal = this.modalCtrl.create(SurveyCreationPage);
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.ngOnInit();
        });
        modal.present();
    };
    SurveyOverviewPage = __decorate([
        Component({
            selector: 'page-survey-overview',
            templateUrl: 'survey-overview.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, ModalController])
    ], SurveyOverviewPage);
    return SurveyOverviewPage;
}());
//# sourceMappingURL=survey-overview.js.map