import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { OpenQuestion } from '../../models/survey-elements/openQuestion';
import { Surveys } from '../../providers/surveys';


@Component({
  selector: 'page-survey-open-question',
  templateUrl: 'survey-open-question.html'
})

export class SurveyOpenQuestionPage {

    userForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyOpenQuestionPage');
  }

  ngOnInit() {

      this.userForm = this.fb.group({
          'elementTitle': '',
          'situation': '',
          'questiontext': ''
      })

  }

  createOpenQuestion(value: any) {

      console.log(JSON.stringify(value));
      //this.surveys.createOpenQuestion(value);

  }
}
