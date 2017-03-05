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
import { SurveyUsers } from '../../providers/survey-users';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalVarService } from '../../providers/global-var-service';
export var UserRegistrationPage = (function () {
    function UserRegistrationPage(navCtrl, navParams, surveyUsers, fb, gloabalVarService, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveyUsers = surveyUsers;
        this.fb = fb;
        this.gloabalVarService = gloabalVarService;
        this.viewCtrl = viewCtrl;
        this.userRole = this.gloabalVarService.userRole;
    }
    UserRegistrationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserRegistrationPage');
    };
    UserRegistrationPage.prototype.ngOnInit = function () {
        this.registrationForm = this.fb.group({
            'username': '',
            'password': ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20)
                ]],
            'passwordConfirmed': ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20)
                ]]
        });
    };
    UserRegistrationPage.prototype.createUser = function (value) {
        console.log(JSON.stringify(value));
        this.surveyUsers.createUser(value).subscribe();
        this.viewCtrl.dismiss();
    };
    UserRegistrationPage = __decorate([
        Component({
            selector: 'page-user-registration',
            templateUrl: 'user-registration.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, SurveyUsers, FormBuilder, GlobalVarService, ViewController])
    ], UserRegistrationPage);
    return UserRegistrationPage;
}());
//# sourceMappingURL=user-registration.js.map