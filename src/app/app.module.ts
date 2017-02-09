import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';


import { UsersPage } from '../pages/users/users';
import { SurveyOverviewPage } from '../pages/survey-overview/survey-overview';
import { SurveyDetailsPage } from '../pages/survey-details/survey-details';
import { SurveyRemovingPage } from '../pages/survey-removing/survey-removing';

import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserCreationPage } from '../pages/user-creation/user-creation';
import { UserRegistrationPage } from '../pages/user-registration/user-registration';

import { SurveyClosedQuestionPage } from '../pages/survey-closed-question/survey-closed-question';
import { SurveyOpenQuestionPage } from '../pages/survey-open-question/survey-open-question';
import { SurveyPersonalDataPage } from '../pages/survey-personal-data/survey-personal-data';
import { SurveyScoreTablePage } from '../pages/survey-score-table/survey-score-table';
import { SurveyTextPage} from '../pages/survey-text/survey-text';
import { LoginPage } from '../pages/login/login';
import { EvaluationPage } from '../pages/evaluation/evaluation';



import { SurveyUsers } from '../providers/survey-users';
import { Surveys } from '../providers/surveys';
import { Login } from '../providers/login';

import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        UsersPage,
        SurveyOverviewPage,
        SurveyDetailsPage,
        UserDetailsPage,
        UserCreationPage,
        UserRegistrationPage,
        SurveyTextPage,
        SurveyPersonalDataPage,
        SurveyClosedQuestionPage,
        SurveyOpenQuestionPage,
        SurveyScoreTablePage,
        EvaluationPage,
        SurveyRemovingPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        ChartsModule

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        UsersPage,
        SurveyOverviewPage,
        SurveyDetailsPage,
        UserDetailsPage,
        UserCreationPage,
        UserRegistrationPage,
        SurveyTextPage,
        SurveyPersonalDataPage,
        SurveyClosedQuestionPage,
        SurveyOpenQuestionPage,
        SurveyScoreTablePage,
        EvaluationPage,
        SurveyRemovingPage
    ],
    providers: [Login, SurveyUsers, Surveys]
})
export class AppModule { }