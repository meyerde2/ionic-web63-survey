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
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { SurveyUsers } from '../../providers/survey-users';
import { FormBuilder, Validators } from '@angular/forms';
export var UserCreationPage = (function () {
    function UserCreationPage(navCtrl, navParams, surveyUsers, fb, viewCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveyUsers = surveyUsers;
        this.fb = fb;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
    }
    UserCreationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserCreationPage');
    };
    UserCreationPage.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            'username': '',
            'firstname': '',
            'lastname': '',
            'role': 2,
            'password': ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20)
                ]],
            'confirmedPassword': ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20)
                ]]
        });
    };
    UserCreationPage.prototype.createUser = function (value) {
        var _this = this;
        console.log(JSON.stringify(value));
        this.surveyUsers.createUser(value).subscribe(function (data) {
            if (data) {
                _this.presentToast("Benutzer erfolgreich erstellt");
                _this.viewCtrl.dismiss();
            }
            else {
                _this.presentToast("Benutzername existiert bereits oder Passwörter ungleich");
                _this.viewCtrl.dismiss();
            }
        }, function (error) {
            _this.presentToast("Fehler: Benutzername existiert bereits oder Passwörter ungleich");
            _this.viewCtrl.dismiss();
        });
    };
    UserCreationPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    UserCreationPage = __decorate([
        Component({
            selector: 'page-user-creation',
            templateUrl: 'user-creation.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, SurveyUsers, FormBuilder, ViewController, ToastController])
    ], UserCreationPage);
    return UserCreationPage;
}());
//# sourceMappingURL=user-creation.js.map