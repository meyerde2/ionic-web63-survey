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
import { NavController } from 'ionic-angular';
import { SurveyUsers } from '../../providers/survey-users';
import { UserDetailsPage } from '../user-details/user-details';
import { UserCreationPage } from '../user-creation/user-creation';
import { ModalController } from 'ionic-angular';
import { GlobalVarService } from '../../providers/global-var-service';
export var UsersPage = (function () {
    function UsersPage(navCtrl, surveyUsersProvider, modalCtrl, gloabalVarService) {
        this.navCtrl = navCtrl;
        this.surveyUsersProvider = surveyUsersProvider;
        this.modalCtrl = modalCtrl;
        this.gloabalVarService = gloabalVarService;
        this.userRole = this.gloabalVarService.userRole;
    }
    UsersPage.prototype.ngOnInit = function () {
        var _this = this;
        this.surveyUsersProvider.load().subscribe(function (surveryUsers) {
            _this.surveyUsers = surveryUsers;
            console.log(surveryUsers);
        });
    };
    UsersPage.prototype.goToUserDetails = function (username) {
        var _this = this;
        var modal = this.modalCtrl.create(UserDetailsPage, { username: username });
        modal.onDidDismiss(function (data) {
            console.log(data);
            console.log("goToUserDismiss");
            _this.ngOnInit();
        });
        modal.present();
    };
    UsersPage.prototype.goToNewUser = function () {
        var _this = this;
        var modal = this.modalCtrl.create(UserCreationPage);
        modal.onDidDismiss(function (data) {
            console.log(data);
            _this.ngOnInit();
        });
        modal.present();
    };
    UsersPage = __decorate([
        Component({
            selector: 'page-users',
            templateUrl: 'users.html'
        }), 
        __metadata('design:paramtypes', [NavController, SurveyUsers, ModalController, GlobalVarService])
    ], UsersPage);
    return UsersPage;
}());
//# sourceMappingURL=users.js.map