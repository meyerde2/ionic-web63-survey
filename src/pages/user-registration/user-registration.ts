import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SurveyUser } from '../../models/surveyUser';
import { SurveyUsers } from '../../providers/survey-users';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-user-registration',
  templateUrl: 'user-registration.html'
})

export class UserRegistrationPage {

    surveyUser: SurveyUser;
    username: string;
    registrationForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveyUsers: SurveyUsers, private fb: FormBuilder) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');
  }


  ngOnInit() {

      this.registrationForm = this.fb.group({
          'username': '',
          'password': '',
          'passwordConfirmed': ''
      })

  }

  createUser(value: any) {

      console.log(JSON.stringify(value));
      this.surveyUsers.createUser(value);

  }
}
