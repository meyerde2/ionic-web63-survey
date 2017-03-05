var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Surveys } from '../../providers/surveys';
import { ModalController } from 'ionic-angular';
import { SurveyClosedQuestionPage } from '../survey-closed-question/survey-closed-question';
import { SurveyOpenQuestionPage } from '../survey-open-question/survey-open-question';
import { SurveyPersonalDataPage } from '../survey-personal-data/survey-personal-data';
import { SurveyScoreTablePage } from '../survey-score-table/survey-score-table';
import { SurveyTextPage } from '../survey-text/survey-text';
import { EvaluationPage } from '../evaluation/evaluation';
import { SurveyRemovingPage } from '../survey-removing/survey-removing';
import { GlobalVarService } from '../../providers/global-var-service';
import { ActionSheetController } from 'ionic-angular';
export var SurveyDetailsPage = (function () {
    function SurveyDetailsPage(navCtrl, navParams, surveysProvider, fb, modalCtrl, actionSheetCtrl, globalVars, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveysProvider = surveysProvider;
        this.fb = fb;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.globalVars = globalVars;
        this.toastCtrl = toastCtrl;
        this.surveyId = 0;
        this.ipAddress = globalVars.ipAddress;
        this.surveyId = navParams.get('id');
        this.surveyForm = this.fb.group({
            'surveyId': '',
            'surveyTitle': '',
            'userId': '',
            'ipAddress': false,
            'sessionId': false,
            'published': false
        });
        this.surveysProvider.loadDetails(this.surveyId).subscribe(function (data) {
            console.log("constructor:  " + _this.data); // object here
            _this.s = data;
        });
    }
    SurveyDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.surveysProvider.loadDetails(this.surveyId).subscribe(function (data) {
            console.log("constructor:  " + _this.data); // object here
            _this.s = data;
            _this.surveyForm.controls['surveyId'].setValue(data.surveyId);
            _this.surveyForm.controls['surveyTitle'].setValue(data.surveyTitle);
            _this.surveyForm.controls['userId'].setValue(data.userId);
            _this.surveyForm.controls['ipAddress'].setValue(data.ipAddress);
            _this.surveyForm.controls['sessionId'].setValue(data.sessionId);
            _this.surveyForm.controls['published'].setValue(data.published);
        });
        this.surveyId = this.navParams.get('id');
        this.surveysProvider.loadSurveyElementsBySurveyID(this.surveyId).subscribe(function (surveyElements) {
            _this.surveyElements = surveyElements;
        });
    };
    SurveyDetailsPage.prototype.ionViewWillEnter = function () {
        console.log("this function will be called every time you enter the view");
        this.ngOnInit();
    };
    SurveyDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyDetailsPage');
    };
    SurveyDetailsPage.prototype.ionViewWillLeave = function () {
        //  this.navCtrl.push(SurveyOverviewPage);
    };
    SurveyDetailsPage.prototype.updateSurvey = function (surveyEntry) {
        var _this = this;
        if (surveyEntry.surveyId > 0) {
            this.surveysProvider.updateSurveyEntry(surveyEntry).subscribe(function (result) {
                if (result != undefined) {
                    _this.presentToast("Update erfolgreich durchgeführt");
                }
                else {
                    _this.presentToast("Update nicht erfolgreich");
                }
            });
        }
    };
    SurveyDetailsPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SurveyDetailsPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Elemente hinzufügen',
            buttons: [
                {
                    text: 'Textelement',
                    role: 'Textelement',
                    handler: function () {
                        _this.presentModal(_this.surveyId, 0, 1);
                        console.log('Textelement clicked');
                    }
                },
                {
                    text: 'Persönliche Daten',
                    handler: function () {
                        _this.presentModal(_this.surveyId, 0, 2);
                        console.log('Persönliche Daten clicked');
                    }
                },
                {
                    text: 'Geschlossene Frage',
                    role: 'Geschlossene Frage',
                    handler: function () {
                        _this.presentModal(_this.surveyId, 0, 3);
                        console.log('Geschlossene Frage clicked');
                    }
                },
                {
                    text: 'Offene Frage',
                    role: 'Offene Frage',
                    handler: function () {
                        _this.presentModal(_this.surveyId, 0, 4);
                        console.log('Offene Frage clicked');
                    }
                },
                {
                    text: 'Bewertungstabelle',
                    role: 'Bewertungstabelle',
                    handler: function () {
                        _this.presentModal(_this.surveyId, 0, 5);
                        console.log('Bewertungstabelle clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SurveyDetailsPage.prototype.presentModal = function (surveyId, elementId, elementType) {
        var _this = this;
        console.log("surveyId:" + surveyId + "  " + "elementID: " + elementId + " Type:" + elementType);
        var modal;
        if (elementType == 1) {
            modal = this.modalCtrl.create(SurveyTextPage, { surveyId: surveyId, elementId: elementId, elementType: elementType });
            modal.onDidDismiss(function (data) {
                console.log(data);
                _this.ngOnInit();
            });
        }
        else if (elementType == 2) {
            modal = this.modalCtrl.create(SurveyPersonalDataPage, { surveyId: surveyId, elementId: elementId, elementType: elementType });
            modal.onDidDismiss(function (data) {
                console.log(data);
                _this.ngOnInit();
            });
        }
        else if (elementType == 3) {
            modal = this.modalCtrl.create(SurveyClosedQuestionPage, { surveyId: surveyId, elementId: elementId, elementType: elementType });
            modal.onDidDismiss(function (data) {
                console.log(data);
                _this.ngOnInit();
            });
        }
        else if (elementType == 4) {
            modal = this.modalCtrl.create(SurveyOpenQuestionPage, { surveyId: surveyId, elementId: elementId, elementType: elementType });
            modal.onDidDismiss(function (data) {
                console.log(data);
                _this.ngOnInit();
            });
        }
        else if (elementType == 5) {
            modal = this.modalCtrl.create(SurveyScoreTablePage, { surveyId: surveyId, elementId: elementId, elementType: elementType });
            modal.onDidDismiss(function (data) {
                console.log(data);
                _this.ngOnInit();
            });
        }
        modal.present();
    };
    SurveyDetailsPage.prototype.presentNewTextElement = function (survey) {
        var _this = this;
        var modal = this.modalCtrl.create(SurveyTextPage);
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.ngOnInit();
        });
        modal.present();
    };
    SurveyDetailsPage.prototype.presentNewPersonalData = function () {
        var _this = this;
        var modal = this.modalCtrl.create(SurveyPersonalDataPage);
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.ngOnInit();
        });
        modal.present();
    };
    SurveyDetailsPage.prototype.presentNewClosedQuestion = function () {
        var _this = this;
        var modal = this.modalCtrl.create(SurveyClosedQuestionPage);
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.ngOnInit();
        });
        modal.present();
    };
    SurveyDetailsPage.prototype.presentNewOpenQuestion = function () {
        var _this = this;
        var modal = this.modalCtrl.create(SurveyOpenQuestionPage);
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.ngOnInit();
        });
        modal.present();
    };
    SurveyDetailsPage.prototype.presentNewScoreTable = function () {
        var _this = this;
        var modal = this.modalCtrl.create(SurveyScoreTablePage);
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.ngOnInit();
        });
        modal.present();
    };
    SurveyDetailsPage.prototype.surveyChange = function (value) {
        console.log(JSON.stringify(value));
        this.surveysProvider.updateSurveyEntry(value);
    };
    SurveyDetailsPage.prototype.openEvaluationPage = function (id) {
        this.navCtrl.push(EvaluationPage, { id: id });
    };
    SurveyDetailsPage.prototype.removingSurveyPage = function (id) {
        var _this = this;
        console.log("removing click");
        var modal = this.modalCtrl.create(SurveyRemovingPage, { id: id });
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.navCtrl.popToRoot();
        });
        modal.present();
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SurveyDetailsPage.prototype, "data", void 0);
    SurveyDetailsPage = __decorate([
        Component({
            selector: 'page-survey-details',
            templateUrl: 'survey-details.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, FormBuilder, ModalController, ActionSheetController, GlobalVarService, ToastController])
    ], SurveyDetailsPage);
    return SurveyDetailsPage;
}());
//# sourceMappingURL=survey-details.js.map