import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SurveyUser } from '../../models/surveyUser';
import { SurveyUsers } from '../../providers/survey-users';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-user-creation',
  templateUrl: 'user-creation.html'
})

export class UserCreationPage {

    surveyUser: SurveyUser;
    username: string;
    userForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveyUsers: SurveyUsers, private fb: FormBuilder) {}

    ionViewDidLoad() {

        console.log('ionViewDidLoad UserCreationPage');

    }

    ngOnInit() {

        this.userForm = this.fb.group({
            'username': '',
            'firstname': '',
            'lastname': '',
            'role': '',
            'password': '',
            'confirmedPassword': ''
        })

    }

    createUser(value: any) {

        console.log(JSON.stringify(value));
        this.surveyUsers.createUser(value);

    }
}
