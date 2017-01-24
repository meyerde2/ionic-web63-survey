import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SurveyUser } from '../../models/surveyUser';

import { SurveyUsers } from '../../providers/survey-users'; 

@Component({
    selector: 'page-user-details',
    templateUrl: 'user-details.html'
})
export class UserDetailsPage {
    surveyUser: SurveyUser;
    username: string;

    constructor(public navCtrl: NavController, private navParams: NavParams, private surveyUsers: SurveyUsers) {
        this.username = navParams.get('username');
        surveyUsers.loadDetails(this.username).subscribe(surveyUser => {
            this.surveyUser = surveyUser;
            console.log(surveyUser);
        })
    }
}