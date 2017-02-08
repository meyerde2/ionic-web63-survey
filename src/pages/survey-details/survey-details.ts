import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Surveys } from '../../providers/surveys';
import { SurveyEntry } from '../../models/surveyEntry';
import { SurveyElement } from '../../models/surveyElement';


import { ModalController } from 'ionic-angular';
import { SurveyClosedQuestionPage } from '../survey-closed-question/survey-closed-question';
import { SurveyOpenQuestionPage } from '../survey-open-question/survey-open-question';
import { SurveyPersonalDataPage } from '../survey-personal-data/survey-personal-data';
import { SurveyScoreTablePage } from '../survey-score-table/survey-score-table';
import { SurveyTextPage } from '../survey-text/survey-text';

import { SurveyOverviewPage } from '../survey-overview/survey-overview';
import { EvaluationPage} from '../evaluation/evaluation';

import { ActionSheetController } from 'ionic-angular'



@Component({
  selector: 'page-survey-details',
  templateUrl: 'survey-details.html'
})
export class SurveyDetailsPage {

    @Input() data;

    public s: SurveyEntry;

    surveyElements: SurveyElement[];

    surveyId = 0;

    public title : string;

    public surveyForm: FormGroup;

    constructor(public navCtrl: NavController, private navParams: NavParams, private surveysProvider: Surveys,
        private fb: FormBuilder, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController) {
        
        this.surveyId = navParams.get('id');

        this.surveyForm = this.fb.group({
            'surveyId': '',
            'surveyTitle': '',
            'userId': '',
            'ipAddress': false,
            'sessionId': false,
            'published': false
        })

      this.surveysProvider.loadDetails(this.surveyId).subscribe(data => {
          console.log("constructor:  " + this.data); // object here
          this.s = data;
      });
    }

  ngOnInit() {

   
      this.surveysProvider.loadDetails(this.surveyId).subscribe(data => {
          console.log("constructor:  " + this.data); // object here
          this.s = data;
          this.surveyForm.controls['surveyId'].setValue(data.surveyId);
          this.surveyForm.controls['surveyTitle'].setValue(data.surveyTitle);
          this.surveyForm.controls['userId'].setValue(data.userId);
          this.surveyForm.controls['ipAddress'].setValue(data.ipAddress);
          this.surveyForm.controls['sessionId'].setValue(data.sessionId);
          this.surveyForm.controls['published'].setValue(data.published);

      });

      this.surveyId = this.navParams.get('id');
      
      this.surveysProvider.loadSurveyElementsBySurveyID(this.surveyId).subscribe(surveyElements => {
          this.surveyElements = surveyElements;
      })
  }

  ionViewWillEnter() {
      console.log("this function will be called every time you enter the view");
      this.ngOnInit();
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad SurveyDetailsPage');
  }


  ionViewWillLeave() {
    //  this.navCtrl.push(SurveyOverviewPage);
 
  }


  updateSurvey(value: any) {
      console.log('hello world');
      console.log(JSON.stringify(value));

      this.surveysProvider.updateSurveyEntry(value);

  }


  presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
          title: 'Elemente hinzufügen',
          buttons: [
              {
                  text: 'Textelement',
                  role: 'Textelement',
                  handler: () => {
                      this.presentModal(this.surveyId, 0, 1);
                      console.log('Textelement clicked');
                  }
              },
              {
                  text: 'Persönliche Daten',
                  handler: () => {
                      this.presentModal(this.surveyId, 0, 2);
                      console.log('Persönliche Daten clicked');
                  }
              },
              {
                  text: 'Geschlossene Frage',
                  role: 'Geschlossene Frage',
                  handler: () => {
                      this.presentModal(this.surveyId, 0, 3);
                      console.log('Geschlossene Frage clicked');
                  }
              },
              {
                  text: 'Offene Frage',
                  role: 'Offene Frage',
                  handler: () => {
                      this.presentModal(this.surveyId, 0, 4);
                      console.log('Offene Frage clicked');
                  }
              },
              {
                  text: 'Bewertungstabelle',
                  role: 'Bewertungstabelle',
                  handler: () => {
                      this.presentModal(this.surveyId, 0, 5);
                      console.log('Bewertungstabelle clicked');
                  }
              }
          ]
      });

      actionSheet.present();
  }

    presentModal(surveyId: number, elementId: number, elementType: number) {

        console.log("surveyId:" + surveyId + "  " + "elementID: " + elementId + " Type:" + elementType);

        let modal; 

        if (elementType == 1) {
            modal = this.modalCtrl.create(SurveyTextPage, {surveyId, elementId, elementType});
            modal.onDidDismiss(data => {
                console.log(data);
                this.ngOnInit();
            });
        } else if (elementType == 2) {
            modal = this.modalCtrl.create(SurveyPersonalDataPage, { surveyId, elementId, elementType});
            modal.onDidDismiss(data => {
                console.log(data);
                this.ngOnInit();
            });
        } else if (elementType == 3) {
            modal = this.modalCtrl.create(SurveyClosedQuestionPage, { surveyId, elementId, elementType });
            modal.onDidDismiss(data => {
                console.log(data);
                this.ngOnInit();
            });
        } else if (elementType == 4) {
            modal = this.modalCtrl.create(SurveyOpenQuestionPage, { surveyId, elementId, elementType });
            modal.onDidDismiss(data => {
                console.log(data);
                this.ngOnInit();
            });
        } else if (elementType == 5) {
            modal = this.modalCtrl.create(SurveyScoreTablePage, { surveyId, elementId, elementType });
            modal.onDidDismiss(data => {
                console.log(data);
                this.ngOnInit();
            });
        } 

        modal.present();
    
    }

    presentNewTextElement(survey) {

        let modal = this.modalCtrl.create(SurveyTextPage);
        modal.onDidDismiss(data => {
            console.log(data);
        });

        modal.present();
    }

    presentNewPersonalData() {

        let modal = this.modalCtrl.create(SurveyPersonalDataPage);
        modal.onDidDismiss(data => {
            console.log(data);
        });

        modal.present();
    }

    presentNewClosedQuestion() {

        let modal = this.modalCtrl.create(SurveyClosedQuestionPage);
        modal.onDidDismiss(data => {
            console.log(data);
        });

        modal.present();
    }

    presentNewOpenQuestion() {

        let modal = this.modalCtrl.create(SurveyOpenQuestionPage);
        modal.onDidDismiss(data => {
            console.log(data);
        });

        modal.present();
    }

    presentNewScoreTable() {

        let modal = this.modalCtrl.create(SurveyScoreTablePage);
        modal.onDidDismiss(data => {
            console.log(data);
        });

        modal.present();
    }

    surveyChange(value: any) {
        console.log(JSON.stringify(value))
        this.surveysProvider.updateSurveyEntry(value);
    }

    openEvaluationPage(id: number) {
        this.navCtrl.push(EvaluationPage, { id });
    }

}
