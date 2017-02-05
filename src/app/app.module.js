var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { UsersPage } from '../pages/users/users';
import { SurveyOverviewPage } from '../pages/survey-overview/survey-overview';
import { SurveyDetailsPage } from '../pages/survey-details/survey-details';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserCreationPage } from '../pages/user-creation/user-creation';
import { UserRegistrationPage } from '../pages/user-registration/user-registration';
import { SurveyClosedQuestionPage } from '../pages/survey-closed-question/survey-closed-question';
import { SurveyOpenQuestionPage } from '../pages/survey-open-question/survey-open-question';
import { SurveyPersonalDataPage } from '../pages/survey-personal-data/survey-personal-data';
import { SurveyScoreTablePage } from '../pages/survey-score-table/survey-score-table';
import { SurveyTextPage } from '../pages/survey-text/survey-text';
import { LoginPage } from '../pages/login/login';
import { SurveyUsers } from '../providers/survey-users';
import { Surveys } from '../providers/surveys';
import { Login } from '../providers/login';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                SurveyScoreTablePage
            ],
            imports: [
                IonicModule.forRoot(MyApp)
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
                SurveyScoreTablePage
            ],
            providers: [Login, SurveyUsers, Surveys]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map