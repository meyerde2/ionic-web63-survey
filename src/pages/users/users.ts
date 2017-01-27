import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SurveyUsers } from '../../providers/survey-users';
import { SurveyUser } from '../../models/surveyUser';

import { UserDetailsPage } from '../user-details/user-details';
import { UserCreationPage } from '../user-creation/user-creation';

@Component({
    selector: 'page-users',
    templateUrl: 'users.html'
})
export class UsersPage {

    surveyUsers: SurveyUser[]


    constructor(public navCtrl: NavController, private surveyUsersProvider: SurveyUsers) {

        surveyUsersProvider.load().subscribe(surveryUsers => {
            this.surveyUsers = surveryUsers;
            console.log(surveryUsers);
        })
    }

    goToUserDetails(username: string) {
        this.navCtrl.push(UserDetailsPage, { username });
    }

    goToNewUser() {
        this.navCtrl.push(UserCreationPage);
    }
}