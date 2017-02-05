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
export var SurveyPersonalDataPage = (function () {
    function SurveyPersonalDataPage(navCtrl, navParams, surveys, fb, toastCtrl, viewCtrl) {
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
    SurveyPersonalDataPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurveyPersonalDataPage');
    };
    SurveyPersonalDataPage.prototype.ngOnInit = function () {
        var _this = this;
        this.personalDataForm = this.fb.group({
            'surveyId': this.surveyId,
            'elementId': '',
            'elementTitle': '',
            'firstname': false,
            'lastname': false,
            'age': false,
            'gender': false,
            'location': false
        });
        if (this.elementId > 0) {
            console.log("elementID > 0");
            this.surveys.loadPersonalDataById(this.surveyId, this.elementId, this.elementType).subscribe(function (personalDataElement) {
                _this.personalDataElement = personalDataElement;
                console.log(personalDataElement);
                _this.personalDataForm.controls['surveyId'].setValue(_this.personalDataElement.surveyId);
                _this.personalDataForm.controls['elementId'].setValue(_this.personalDataElement.elementId);
                _this.personalDataForm.controls['elementTitle'].setValue(_this.personalDataElement.elementTitle);
            });
        }
    };
    SurveyPersonalDataPage.prototype.submitPersonalDataElement = function (personalData) {
        var _this = this;
        if (0 == personalData.elementId || null == personalData.elementId || undefined == personalData.elementId) {
            this.surveys.createPersonalDataElement(personalData).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + result);
                _this.personalDataForm.controls['elementId'].setValue(result.elementId);
                _this.presentToast("Element erfolgreich erstellt");
            }, function (err) {
                _this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
            });
        }
        else {
            this.surveys.updatePersonalDataElement(personalData).subscribe(function (result) {
                console.log('Result received');
                console.log("Result:  " + JSON.stringify(result));
                _this.presentToast("Element erfolgreich aktualisiert");
            }, function (err) {
                _this.presentToast("Beim Aktualisieren ist ein Fehler aufgetreten");
            });
        }
        this.viewCtrl.dismiss();
    };
    SurveyPersonalDataPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SurveyPersonalDataPage = __decorate([
        Component({
            selector: 'page-survey-personal-data',
            templateUrl: 'survey-personal-data.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys, FormBuilder, ToastController, ViewController])
    ], SurveyPersonalDataPage);
    return SurveyPersonalDataPage;
}());
//# sourceMappingURL=survey-personal-data.js.map