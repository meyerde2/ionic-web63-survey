import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PersonalData } from '../../models/survey-elements/personalData';
import { Surveys } from '../../providers/surveys';

@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html'
})
export class EvaluationPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluationPage');
  }

}
