import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Surveys } from '../../providers/surveys';
import { SurveyEntry } from '../../models/surveyEntry';

import { SurveyDetailsPage } from '../survey-details/survey-details';

/*
  Generated class for the SurveyOverview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-survey-overview',
  templateUrl: 'survey-overview.html'
})
export class SurveyOverviewPage {

    surveys: SurveyEntry[]

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveysProvider: Surveys) {

        surveysProvider.load().subscribe(surveys => {
            this.surveys = surveys;
            console.log(surveys);
        })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyOverviewPage');
  }

  goToSurveyDetails(id: number) {
      this.navCtrl.push(SurveyDetailsPage, { id });
  }
}
