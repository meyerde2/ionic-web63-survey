import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Surveys } from '../../providers/surveys';

@Component({
  selector: 'page-survey-creation',
  templateUrl: 'survey-creation.html'
})
export class SurveyCreationPage {

    surveyForm: FormGroup;


    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyCreationPage');
  }

  ngOnInit() {

      this.surveyForm = this.fb.group({
          'surveyTitle': '',
          'sessionId': false,
          'ipAddress': false
      })

  }

  createSurvey(value: any) {
      console.log(JSON.stringify(value));
      this.surveys.createSurvey(value).subscribe((data) => {
          console.log("data:  Create new Survey: " + data);
          this.viewCtrl.dismiss();
      });
  }

}
