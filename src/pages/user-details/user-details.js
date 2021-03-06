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
import { GlobalVarService } from '../../providers/global-var-service';
import { FormBuilder } from '@angular/forms';
export var UserDetailsPage = (function () {
    function UserDetailsPage(navCtrl, navParams, surveyUsers, fb, viewCtrl, gloabalVarService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveyUsers = surveyUsers;
        this.fb = fb;
        this.viewCtrl = viewCtrl;
        this.gloabalVarService = gloabalVarService;
        this.username = navParams.get('username');
        surveyUsers.loadDetails(this.username).subscribe(function (surveyUser) {
            _this.surveyUser = surveyUser;
            console.log(surveyUser);
        });
    }
    UserDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.fb.group({
            'username': '',
            'firstname': '',
            'lastname': '',
            'role': '',
            'password': '',
            'confirmedPassword': ''
        });
        this.username = this.navParams.get('username');
        this.surveyUsers.loadDetails(this.username).subscribe(function (data) {
            _this.surveyUser = data;
            _this.userRole = _this.gloabalVarService.userRole;
            _this.userForm.controls['username'].setValue(_this.surveyUser.username);
            _this.userForm.controls['firstname'].setValue(_this.surveyUser.firstname);
            _this.userForm.controls['lastname'].setValue(_this.surveyUser.lastname);
            _this.userForm.controls['role'].setValue(_this.surveyUser.role);
        });
    };
    UserDetailsPage.prototype.ionViewWillEnter = function () {
        console.log("this function will be called every time you enter the view");
        this.ngOnInit();
    };
    UserDetailsPage.prototype.updateUser = function (value) {
        console.log(JSON.stringify(value));
        this.surveyUsers.updateUser(value);
        this.viewCtrl.dismiss();
    };
    UserDetailsPage = __decorate([
        Component({
            selector: 'page-user-details',
            templateUrl: 'user-details.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, SurveyUsers, FormBuilder, ViewController, GlobalVarService])
    ], UserDetailsPage);
    return UserDetailsPage;
}());
//# sourceMappingURL=user-details.js.map