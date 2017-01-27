import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClosedQuestion } from '../../models/survey-elements/closedQuestion';
import { Surveys } from '../../providers/surveys';

@Component({
  selector: 'page-survey-closed-question',
  templateUrl: 'survey-closed-question.html'
})
export class SurveyClosedQuestionPage {


    closedQuestionForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SurveyClosedQuestionPage');
    }


    ngOnInit() {

        this.closedQuestionForm = this.fb.group({
            'elementTitle': '',
            'situation': '',
            'questiontext': ''
        })

    }

    closedQuestion(value: any) {

        console.log(JSON.stringify(value));
        //this.surveys.createClosedQuestion(value);

    }


}
