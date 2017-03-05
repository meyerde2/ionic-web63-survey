import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { SurveyUser } from '../../models/surveyUser';
import { SurveyUsers } from '../../providers/survey-users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-user-creation',
  templateUrl: 'user-creation.html'
})

export class UserCreationPage {

    surveyUser: SurveyUser;
    username: string;
    userForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveyUsers: SurveyUsers, private fb: FormBuilder, private viewCtrl: ViewController, private toastCtrl: ToastController) { }

    ionViewDidLoad() {

        console.log('ionViewDidLoad UserCreationPage');

    }

    ngOnInit() {

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

        })

    }

    createUser(value: any) {

        console.log(JSON.stringify(value));
        this.surveyUsers.createUser(value).subscribe(data => {
            if (data) {
                this.presentToast("Benutzer erfolgreich erstellt");
                this.viewCtrl.dismiss();
            } else {
                this.presentToast("Benutzername existiert bereits oder Passwörter ungleich");
                this.viewCtrl.dismiss();
            }

        },
            error => {
                this.presentToast("Fehler: Benutzername existiert bereits oder Passwörter ungleich");
                this.viewCtrl.dismiss();
            });
    }

    presentToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
    
}
