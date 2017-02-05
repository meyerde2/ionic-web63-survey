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
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Surveys } from '../../providers/surveys';
export var SurveyScoreTablePage = (function () {
    function SurveyScoreTablePage(navCtrl, navParams, surveys, fb, toastCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveys = surveys;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');
    }
    SurveyScoreTablePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyScoreTablePage');
    };
    SurveyScoreTablePage.prototype.ngOnInit = function () {
        var _this = this;
        this.scoreTableForm = this.fb.group({
            'surveyId': this.surveyId,
            'elementId': '',
            'elementTitle': '',
            'situation': '',
            'questiontext': '',
            'criterion1': '',
            'criterion2': '',
            'criterion3': '',
            'criterion4': '',
            'criterion5': '',
            'criterion6': ''
        });
        if (this.elementId > 0) {
            console.log("elementID > 0");
            this.surveys.loadScoreTableDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(function (scoreTableElement) {
                _this.scoreTableElement = scoreTableElement;
                console.log(scoreTableElement);
                _this.scoreTableForm.controls['elementId'].setValue(_this.scoreTableElement.elementId);
                _this.scoreTableForm.controls['elementTitle'].setValue(_this.scoreTableElement.elementTitle);
                _this.scoreTableForm.controls['situation'].setValue(_this.scoreTableElement.situation);
                _this.scoreTableForm.controls['questiontext'].setValue(_this.scoreTableElement.questiontext);
                _this.scoreTableForm.controls['criterion1'].setValue(_this.scoreTableElement.criterion1);
                _this.scoreTableForm.controls['criterion2'].setValue(_this.scoreTableElement.criterion2);
                _this.scoreTableForm.controls['criterion3'].setValue(_this.scoreTableElement.criterion3);
                _this.scoreTableForm.controls['criterion4'].setValue(_this.scoreTableElement.criterion4);
                _this.scoreTableForm.controls['criterion5'].setValue(_this.scoreTableElement.criterion5);
                _this.scoreTableForm.controls['criterion6'].setValue(_this.scoreTableElement.criterion6);
            });
        }
    };
    SurveyScoreTablePage.prototype.submitScoreTableElement = function (scoreTable) {
        var _this = this;
        if (0 == scoreTable.elementId || null == scoreTable.elementId || undefined == scoreTable.elementId) {
            this.surveys.createScoreTableElement(scoreTable).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + result);
                _this.scoreTableForm.controls['elementId'].setValue(result.elementId);
                _this.presentToast("Element erfolgreich erstellt");
            }, function (err) {
                _this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
            });
        }
        else {
            this.surveys.updateScoreTableElement(scoreTable).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + JSON.stringify(result));
                _this.presentToast("Element erfolgreich aktualisiert");
            }, function (err) {
                _this.presentToast("Beim Aktualisieren ist ein Fehler aufgetreten");
            });
        }
        this.viewCtrl.dismiss();
    };
    SurveyScoreTablePage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SurveyScoreTablePage = __decorate([
        Component({
            selector: 'page-survey-score-table',
            templateUrl: 'survey-score-table.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, FormBuilder, ToastController, ViewController])
    ], SurveyScoreTablePage);
    return SurveyScoreTablePage;
}());
//# sourceMappingURL=survey-score-table.js.map