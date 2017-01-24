import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Surveys } from '../../providers/surveys';
import { SurveyEntry } from '../../models/surveyEntry';


@Component({
  selector: 'page-survey-details',
  templateUrl: 'survey-details.html'
})
export class SurveyDetailsPage {

    @Input() data;

    public s: SurveyEntry;

    surveyId = 0;

    public title : string;

    public surveyForm: FormGroup;

    constructor(public navCtrl: NavController, private navParams: NavParams, private surveysProvider: Surveys, private fb: FormBuilder) {
        this.surveyId = navParams.get('id');
        surveysProvider.loadDetails(this.surveyId).subscribe(data => {
            this.s = data;
        });
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad SurveyDetailsPage');
  }

  ngOnInit() {

      console.log('JO: ' + JSON.stringify(this.s));
      this.surveyForm = this.fb.group({
          // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
          'surveyId': '',
          'surveyTitle': '',
          'userId': '',
          'ipAddress': false,
          'sessionId': false,
          'published': false
      })

      this.surveyId = this.navParams.get('id');
      this.surveysProvider.loadDetails(this.surveyId).subscribe(data => {
          console.log("constructor:  " + this.data); // object here
          this.s = data;
          this.surveyForm.controls['surveyId'].setValue(this.s.surveyId);
          this.surveyForm.controls['surveyTitle'].setValue(this.s.surveyTitle);
          this.surveyForm.controls['userId'].setValue(this.s.userId);
          this.surveyForm.controls['ipAddress'].setValue(this.s.ipAddress);
          this.surveyForm.controls['sessionId'].setValue(this.s.sessionId);
          this.surveyForm.controls['published'].setValue(this.s.published);


      });

  }

  ionViewWillEnter() {
      console.log("this function will be called every time you enter the view");
  }


  todo = {}

  survey = {}

  updateSurvey(value: any) {
      console.log('hello world');
      console.log(JSON.stringify(value));
  }

  logForm() {
      console.log(this.todo)
  }

}
