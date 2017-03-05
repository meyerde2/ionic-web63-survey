import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


import { SurveyUser } from '../../models/surveyUser';
import { SurveyUsers } from '../../providers/survey-users';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GlobalVarService } from '../../providers/global-var-service'; 

@Component({
  selector: 'page-user-registration',
  templateUrl: 'user-registration.html'
})

export class UserRegistrationPage {

    surveyUser: SurveyUser;
    username: string;
    registrationForm: FormGroup;
    userRole: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveyUsers: SurveyUsers, private fb: FormBuilder, private gloabalVarService: GlobalVarService, private viewCtrl: ViewController) {
        this.userRole = this.gloabalVarService.userRole;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');
  }

  ngOnInit() {

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
      })

  }

  createUser(value: any) {

      console.log(JSON.stringify(value));
      this.surveyUsers.createUser(value).subscribe();
      this.viewCtrl.dismiss();

  }
}
