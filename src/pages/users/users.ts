import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../models/user';
import { SurveyUser } from '../../models/surveyUser';

import { GithubUsers } from '../../providers/github-users';
import { SurveyUsers } from '../../providers/survey-users';


import { UserDetailsPage } from '../user-details/user-details';

@Component({
    selector: 'page-users',
    templateUrl: 'users.html'
})
export class UsersPage {
    users: User[]

    surveyUsers: SurveyUser[]


    constructor(public navCtrl: NavController, private githubUsers: GithubUsers, private surveyUsersProvider: SurveyUsers) {

        surveyUsersProvider.load().subscribe(surveryUsers => {
            this.surveyUsers = surveryUsers;
            console.log(surveryUsers);
        })
    }

    goToUserDetails(username: string) {
        this.navCtrl.push(UserDetailsPage, { username });
    }
}