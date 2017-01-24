import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { OrganisationsPage } from '../pages/organisations/organisations';
import { SurveyOverviewPage } from '../pages/survey-overview/survey-overview';
import { SurveyDetailsPage } from '../pages/survey-details/survey-details';
import { UserDetailsPage } from '../pages/user-details/user-details';


import { GithubUsers } from '../providers/github-users';
import { SurveyUsers } from '../providers/survey-users';
import { Surveys } from '../providers/surveys';


@NgModule({
    declarations: [
        MyApp,
        UsersPage,
        ReposPage,
        OrganisationsPage,
        SurveyOverviewPage,
        SurveyDetailsPage,
        UserDetailsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        UsersPage,
        ReposPage,
        OrganisationsPage,
        SurveyOverviewPage,
        SurveyDetailsPage,
        UserDetailsPage
    ],
    providers: [GithubUsers, SurveyUsers, Surveys]
})
export class AppModule { }