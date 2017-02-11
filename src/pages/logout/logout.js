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
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../../providers/login';
import { LoginPage } from '../login/login';
export var LogoutPage = (function () {
    function LogoutPage(navCtrl, navParams, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        navCtrl.setRoot(LoginPage);
        //navCtrl.popToRoot();
        navCtrl.push(LoginPage);
        auth.logout();
        console.log('augeloggt LogoutPage');
    }
    LogoutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LogoutPage');
    };
    LogoutPage = __decorate([
        Component({
            selector: 'page-logout',
            templateUrl: 'logout.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Login])
    ], LogoutPage);
    return LogoutPage;
}());
//# sourceMappingURL=logout.js.map