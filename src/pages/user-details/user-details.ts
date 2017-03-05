import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SurveyUser } from '../../models/surveyUser';

import { SurveyUsers } from '../../providers/survey-users';
import { GlobalVarService } from '../../providers/global-var-service'; 

import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersPage } from '../users/users';


@Component({
    selector: 'page-user-details',
    templateUrl: 'user-details.html'
})
export class UserDetailsPage {
    surveyUser: SurveyUser;
    username: string;
    userRole: number;

    userForm: FormGroup;

    constructor(public navCtrl: NavController, private navParams: NavParams, private surveyUsers: SurveyUsers, private fb: FormBuilder, private viewCtrl: ViewController, private gloabalVarService: GlobalVarService) {
        this.username = navParams.get('username');
        surveyUsers.loadDetails(this.username).subscribe(surveyUser => {
            this.surveyUser = surveyUser;
            console.log(surveyUser);
        })
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

        this.username = this.navParams.get('username');
        this.surveyUsers.loadDetails(this.username).subscribe(data => {

            this.surveyUser = data;
            this.userRole = this.gloabalVarService.userRole;
            this.userForm.controls['username'].setValue(this.surveyUser.username);
            this.userForm.controls['firstname'].setValue(this.surveyUser.firstname);
            this.userForm.controls['lastname'].setValue(this.surveyUser.lastname);
            this.userForm.controls['role'].setValue(this.surveyUser.role);

        });

    }

    ionViewWillEnter() {
        console.log("this function will be called every time you enter the view");
        this.ngOnInit();
    }

    updateUser(value: any) {

        console.log(JSON.stringify(value));
        this.surveyUsers.updateUser(value);
        this.viewCtrl.dismiss();

    }
}