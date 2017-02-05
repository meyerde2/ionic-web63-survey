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
export var SurveyClosedQuestionPage = (function () {
    function SurveyClosedQuestionPage(navCtrl, navParams, surveys, fb, toastCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveys = surveys;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');
        console.log("surveyId:" + this.surveyId);
        console.log("elementID:" + this.elementId);
        console.log("elementType:" + this.elementType);
    }
    SurveyClosedQuestionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyClosedQuestionPage');
    };
    SurveyClosedQuestionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.closedQuestionForm = this.fb.group({
            'surveyId': this.surveyId,
            'elementId': '',
            'elementTitle': '',
            'situation': '',
            'questiontext': '',
            'answer1': '',
            'answer2': '',
            'answer3': '',
            'answer4': '',
            'answer5': '',
            'answer6': '',
            'optionalTextfield': false,
            'multipleSelection': false
        });
        if (this.elementId > 0) {
            console.log("elementID > 0");
            this.surveys.loadClosedQuestionDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(function (closedQuestionElement) {
                _this.closedQuestionElement = closedQuestionElement;
                console.log(closedQuestionElement);
                _this.closedQuestionForm.controls['elementId'].setValue(_this.closedQuestionElement.elementId);
                _this.closedQuestionForm.controls['elementTitle'].setValue(_this.closedQuestionElement.elementTitle);
                _this.closedQuestionForm.controls['situation'].setValue(_this.closedQuestionElement.situation);
                _this.closedQuestionForm.controls['questiontext'].setValue(_this.closedQuestionElement.questiontext);
                _this.closedQuestionForm.controls['answer1'].setValue(_this.closedQuestionElement.answer1);
                _this.closedQuestionForm.controls['answer2'].setValue(_this.closedQuestionElement.answer2);
                _this.closedQuestionForm.controls['answer3'].setValue(_this.closedQuestionElement.answer3);
                _this.closedQuestionForm.controls['answer4'].setValue(_this.closedQuestionElement.answer4);
                _this.closedQuestionForm.controls['answer5'].setValue(_this.closedQuestionElement.answer5);
                _this.closedQuestionForm.controls['answer6'].setValue(_this.closedQuestionElement.answer6);
                _this.closedQuestionForm.controls['optionalTextfield'].setValue(_this.closedQuestionElement.optionalTextfield);
                _this.closedQuestionForm.controls['multipleSelection'].setValue(_this.closedQuestionElement.multipleSelection);
            });
        }
    };
    SurveyClosedQuestionPage.prototype.submitClosedQuestionElement = function (closedQuestion) {
        var _this = this;
        if (0 == closedQuestion.elementId || null == closedQuestion.elementId || undefined == closedQuestion.elementId) {
            this.surveys.createClosedQuestionElement(closedQuestion).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + result);
                _this.closedQuestionForm.controls['elementId'].setValue(result.elementId);
                _this.presentToast("Element erfolgreich erstellt");
            }, function (err) {
                _this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
            });
        }
        else {
            this.surveys.updateClosedQuestionElement(closedQuestion).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + JSON.stringify(result));
                _this.presentToast("Element erfolgreich aktualisiert");
            }, function (err) {
                _this.presentToast("Beim Aktualisieren ist ein Fehler aufgetreten");
            });
        }
        this.viewCtrl.dismiss();
    };
    SurveyClosedQuestionPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SurveyClosedQuestionPage = __decorate([
        Component({
            selector: 'page-survey-closed-question',
            templateUrl: 'survey-closed-question.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, FormBuilder, ToastController, ViewController])
    ], SurveyClosedQuestionPage);
    return SurveyClosedQuestionPage;
}());
//# sourceMappingURL=survey-closed-question.js.map