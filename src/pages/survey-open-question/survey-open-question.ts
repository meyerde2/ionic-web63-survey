import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { OpenQuestion } from '../../models/survey-elements/openQuestion';
import { Surveys } from '../../providers/surveys';


@Component({
  selector: 'page-survey-open-question',
  templateUrl: 'survey-open-question.html'
})

export class SurveyOpenQuestionPage {

    openQuestionForm: FormGroup;
    surveyId: number;
    elementId: number;
    elementType: number;

    openQuestionElement: OpenQuestion;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder, private toastCtrl: ToastController, private viewCtrl: ViewController) {
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyOpenQuestionPage');
  }

  ngOnInit() {

      this.openQuestionForm = this.fb.group({
          'surveyId': this.surveyId,
          'elementId': '',
          'elementTitle': '',
          'situation': '',
          'questiontext': ''
      })

      if (this.elementId > 0) {
          console.log("elementID > 0");
          this.surveys.loadOpenQuestionDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(openQuestionElement => {
              this.openQuestionElement = openQuestionElement;
              console.log(openQuestionElement);

              this.openQuestionForm.controls['elementId'].setValue(this.openQuestionElement.elementId);
              this.openQuestionForm.controls['elementTitle'].setValue(this.openQuestionElement.elementTitle);
              this.openQuestionForm.controls['situation'].setValue(this.openQuestionElement.situation);
              this.openQuestionForm.controls['questiontext'].setValue(this.openQuestionElement.questiontext);

          })
      } 

  }


  submitOpenQuestionElement(openQuestion: OpenQuestion) {

      if (0 == openQuestion.elementId || null == openQuestion.elementId || undefined == openQuestion.elementId) {

          this.surveys.createOpenQuestionElement(openQuestion).subscribe(
              (result) => {
                  console.log('Result received');
                  console.log("Result:  " + result);

                  this.openQuestionForm.controls['elementId'].setValue(result.elementId);

                  this.presentToast("Element erfolgreich erstellt");
              },

              err => {
                  this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
              }
          );

      } else {
          this.surveys.updateOpenQuestionElement(openQuestion).subscribe((result) => {
              console.log('Result received');
              console.log("Result:  " + JSON.stringify(result));

              this.presentToast("Element erfolgreich aktualisiert");
          },
              err => {
                  this.presentToast("Beim Aktualisieren ist ein Fehler aufgetreten");
              }
          );
      }

      this.viewCtrl.dismiss();
  }


  presentToast(message: string) {
      let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'bottom'
      });
      toast.present();
  }
}
