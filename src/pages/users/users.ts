import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SurveyUsers } from '../../providers/survey-users';
import { SurveyUser } from '../../models/surveyUser';

import { UserDetailsPage } from '../user-details/user-details';
import { UserCreationPage } from '../user-creation/user-creation';

import { ModalController } from 'ionic-angular';

import { GlobalVarService } from '../../providers/global-var-service'; 

@Component({
    selector: 'page-users',
    templateUrl: 'users.html'
})
export class UsersPage {

    surveyUsers: SurveyUser[];
    userRole: number;

    constructor(public navCtrl: NavController, private surveyUsersProvider: SurveyUsers, public modalCtrl: ModalController, private gloabalVarService: GlobalVarService) {
        this.userRole = this.gloabalVarService.userRole;
    }

    ngOnInit() {
        this.surveyUsersProvider.load().subscribe(surveryUsers => {
            this.surveyUsers = surveryUsers;
            console.log(surveryUsers);
        })
    }

    goToUserDetails(username: string) {
        let modal = this.modalCtrl.create(UserDetailsPage, { username });
        modal.onDidDismiss(data => {
            console.log(data);
            console.log("goToUserDismiss");
            this.ngOnInit();
        });

        modal.present();
    }

    goToNewUser() {
        let modal = this.modalCtrl.create(UserCreationPage);
        modal.onDidDismiss(data => {
            console.log(data);
            this.ngOnInit();
        });

        modal.present();
    }
}