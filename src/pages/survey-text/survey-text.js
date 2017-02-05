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
export var SurveyTextPage = (function () {
    function SurveyTextPage(navCtrl, navParams, surveys, fb, toastCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveys = surveys;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');
        console.log(this.surveyId);
    }
    SurveyTextPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyTextPage');
    };
    SurveyTextPage.prototype.ngOnInit = function () {
        var _this = this;
        this.textForm = this.fb.group({
            'elementTitle': '',
            'text': '',
            'surveyId': this.surveyId,
            'elementId': ''
        });
        if (this.elementId > 0) {
            console.log("elementID >= 0");
            this.surveys.loadTextDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(function (textElement) {
                _this.textElement = textElement;
                console.log(textElement);
                _this.textForm.controls['elementTitle'].setValue(_this.textElement.elementTitle);
                _this.textForm.controls['text'].setValue(_this.textElement.text);
                _this.textForm.controls['elementId'].setValue(_this.textElement.elementId);
            });
        }
    };
    SurveyTextPage.prototype.submitTextElement = function (value) {
        var _this = this;
        var text;
        text = value;
        if (0 == text.elementId || null == text.elementId || undefined == text.elementId) {
            this.surveys.createTextElement(text).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + result);
                _this.textForm.controls['elementId'].setValue(result.elementId);
                _this.presentToast("Element erfolgreich erstellt");
            }, function (err) {
                _this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
            });
        }
        else {
            this.surveys.updateTextElement(text).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + JSON.stringify(result));
                _this.presentToast("Element erfolgreich aktualisiert");
            }, function (err) {
                _this.presentToast("Beim Aktualisieren ist ein Fehler aufgetreten");
            });
        }
        this.viewCtrl.dismiss();
    };
    SurveyTextPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SurveyTextPage = __decorate([
        Component({
            selector: 'page-survey-text',
            templateUrl: 'survey-text.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, FormBuilder, ToastController, ViewController])
    ], SurveyTextPage);
    return SurveyTextPage;
}());
//# sourceMappingURL=survey-text.js.map