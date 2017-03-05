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
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SurveyOverviewPage } from '../survey-overview/survey-overview';
import { UserRegistrationPage } from '../user-registration/user-registration';
import { Login } from '../../providers/login';
export var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, auth, alertCtrl, loadingCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.registerCredentials = { username: '', password: '', applicationServer: '192.168.178.40:8080' };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoading();
        console.log('Login' + this.registerCredentials.username + "   " + this.registerCredentials.password + "   " + this.registerCredentials.applicationServer);
        this.auth.login(this.registerCredentials).subscribe(function (allowed) {
            if (allowed) {
                setTimeout(function () {
                    _this.loading.dismiss();
                    _this.navCtrl.setRoot(SurveyOverviewPage);
                });
            }
            else {
                _this.showError("Zugriff verweigert - Benutzername oder Passwort falsch");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        var _this = this;
        setTimeout(function () {
            _this.loading.dismiss();
        });
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    LoginPage.prototype.presentUserRegistrationForm = function () {
        var modal = this.modalCtrl.create(UserRegistrationPage);
        modal.onDidDismiss(function (data) {
            console.log(data);
        });
        modal.present();
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Login, AlertController, LoadingController, ModalController])
    ], LoginPage);
    return LoginPage;
}());
//# sourceMappingURL=login.js.map