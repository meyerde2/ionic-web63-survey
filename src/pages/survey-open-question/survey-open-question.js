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
export var SurveyOpenQuestionPage = (function () {
    function SurveyOpenQuestionPage(navCtrl, navParams, surveys, fb, toastCtrl, viewCtrl) {
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
    SurveyOpenQuestionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyOpenQuestionPage');
    };
    SurveyOpenQuestionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.openQuestionForm = this.fb.group({
            'surveyId': this.surveyId,
            'elementId': '',
            'elementTitle': '',
            'situation': '',
            'questiontext': ''
        });
        if (this.elementId > 0) {
            console.log("elementID > 0");
            this.surveys.loadOpenQuestionDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(function (openQuestionElement) {
                _this.openQuestionElement = openQuestionElement;
                console.log(openQuestionElement);
                _this.openQuestionForm.controls['elementId'].setValue(_this.openQuestionElement.elementId);
                _this.openQuestionForm.controls['elementTitle'].setValue(_this.openQuestionElement.elementTitle);
                _this.openQuestionForm.controls['situation'].setValue(_this.openQuestionElement.situation);
                _this.openQuestionForm.controls['questiontext'].setValue(_this.openQuestionElement.questiontext);
            });
        }
    };
    SurveyOpenQuestionPage.prototype.submitOpenQuestionElement = function (openQuestion) {
        var _this = this;
        if (0 == openQuestion.elementId || null == openQuestion.elementId || undefined == openQuestion.elementId) {
            this.surveys.createOpenQuestionElement(openQuestion).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + result);
                _this.openQuestionForm.controls['elementId'].setValue(result.elementId);
                _this.presentToast("Element erfolgreich erstellt");
            }, function (err) {
                _this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
            });
        }
        else {
            this.surveys.updateOpenQuestionElement(openQuestion).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + JSON.stringify(result));
                _this.presentToast("Element erfolgreich aktualisiert");
            }, function (err) {
                _this.presentToast("Beim Aktualisieren ist ein Fehler aufgetreten");
            });
        }
        this.viewCtrl.dismiss();
    };
    SurveyOpenQuestionPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SurveyOpenQuestionPage = __decorate([
        Component({
            selector: 'page-survey-open-question',
            templateUrl: 'survey-open-question.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, FormBuilder, ToastController, ViewController])
    ], SurveyOpenQuestionPage);
    return SurveyOpenQuestionPage;
}());
//# sourceMappingURL=survey-open-question.js.map