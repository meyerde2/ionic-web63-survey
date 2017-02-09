import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

import { Surveys } from '../../providers/surveys';
import { SurveyOverviewPage } from '../survey-overview/survey-overview';

@Component({
  selector: 'page-survey-removing',
  templateUrl: 'survey-removing.html'
})
export class SurveyRemovingPage {

    surveyId = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private viewCtrl: ViewController) {
        this.surveyId = navParams.get('id');
        console.log("constructor survey:  " + this.surveyId);

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyRemovingPage');
  }

  submitRemoving(id : number) {
      console.log("löschen..." + id);
      //
      //this.navCtrl.popTo(SurveyOverviewPage);
      this.surveys.deleteSurvey(id).subscribe();
      this.viewCtrl.dismiss();
  }

}
