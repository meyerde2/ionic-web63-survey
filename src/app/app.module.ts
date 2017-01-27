import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { UsersPage } from '../pages/users/users';
import { SurveyOverviewPage } from '../pages/survey-overview/survey-overview';
import { SurveyDetailsPage } from '../pages/survey-details/survey-details';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserCreationPage} from '../pages/user-creation/user-creation';


import { SurveyUsers } from '../providers/survey-users';
import { Surveys } from '../providers/surveys';


@NgModule({
    declarations: [
        MyApp,
        UsersPage,
        SurveyOverviewPage,
        SurveyDetailsPage,
        UserDetailsPage,
        UserCreationPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        UsersPage,
        SurveyOverviewPage,
        SurveyDetailsPage,
        UserDetailsPage,
        UserCreationPage
    ],
    providers: [SurveyUsers, Surveys]
})
export class AppModule { }