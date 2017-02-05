import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ScoreTable } from '../../models/survey-elements/scoreTable';
import { Surveys } from '../../providers/surveys';


@Component({
  selector: 'page-survey-score-table',
  templateUrl: 'survey-score-table.html'
})
export class SurveyScoreTablePage {

    scoreTableForm: FormGroup;
    surveyId: number;
    elementId: number;
    elementType: number;

    scoreTableElement: ScoreTable;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder, private toastCtrl: ToastController, private viewCtrl: ViewController) {
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyScoreTablePage');
  }


  ngOnInit() {

      this.scoreTableForm = this.fb.group({
          'surveyId': this.surveyId,
          'elementId': '',
          'elementTitle': '',
          'situation': '',
          'questiontext': '',
          'criterion1': '',
          'criterion2': '',
          'criterion3': '',
          'criterion4': '',
          'criterion5': '',
          'criterion6': ''
      })


      if (this.elementId > 0) {
          console.log("elementID > 0");
          this.surveys.loadScoreTableDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(scoreTableElement => {
              this.scoreTableElement = scoreTableElement;
              console.log(scoreTableElement);

              this.scoreTableForm.controls['elementId'].setValue(this.scoreTableElement.elementId);
              this.scoreTableForm.controls['elementTitle'].setValue(this.scoreTableElement.elementTitle);
              this.scoreTableForm.controls['situation'].setValue(this.scoreTableElement.situation);
              this.scoreTableForm.controls['questiontext'].setValue(this.scoreTableElement.questiontext);
              this.scoreTableForm.controls['criterion1'].setValue(this.scoreTableElement.criterion1);
              this.scoreTableForm.controls['criterion2'].setValue(this.scoreTableElement.criterion2);
              this.scoreTableForm.controls['criterion3'].setValue(this.scoreTableElement.criterion3);
              this.scoreTableForm.controls['criterion4'].setValue(this.scoreTableElement.criterion4);
              this.scoreTableForm.controls['criterion5'].setValue(this.scoreTableElement.criterion5);
              this.scoreTableForm.controls['criterion6'].setValue(this.scoreTableElement.criterion6);

          })
      }

  }


  submitScoreTableElement(scoreTable: ScoreTable) {

      if (0 == scoreTable.elementId || null == scoreTable.elementId || undefined == scoreTable.elementId) {

          this.surveys.createScoreTableElement(scoreTable).subscribe(
              (result) => {
                  console.log('Result received');
                  console.log("Result:  " + result);

                  this.scoreTableForm.controls['elementId'].setValue(result.elementId);

                  this.presentToast("Element erfolgreich erstellt");
              },

              err => {
                  this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
              }
          );

      } else {
          this.surveys.updateScoreTableElement(scoreTable).subscribe((result) => {
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
