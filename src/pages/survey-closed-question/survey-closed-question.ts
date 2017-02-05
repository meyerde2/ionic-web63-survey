import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClosedQuestion } from '../../models/survey-elements/closedQuestion';
import { Surveys } from '../../providers/surveys';

@Component({
  selector: 'page-survey-closed-question',
  templateUrl: 'survey-closed-question.html'
})
export class SurveyClosedQuestionPage {


    closedQuestionForm: FormGroup;
    surveyId: number;
    elementId: number;
    elementType: number;

    closedQuestionElement : ClosedQuestion;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder, private toastCtrl: ToastController, private viewCtrl: ViewController) {
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');

        console.log("surveyId:" + this.surveyId);
        console.log("elementID:" + this.elementId);
        console.log("elementType:" + this.elementType);
       
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SurveyClosedQuestionPage');
    }


    ngOnInit() {

        this.closedQuestionForm = this.fb.group({
            'surveyId': this.surveyId,
            'elementId': '',
            'elementTitle': '',
            'situation': '',
            'questiontext': '',
            'answer1': '',
            'answer2': '',
            'answer3': '',
            'answer4': '',
            'answer5': '',
            'answer6': '',
            'optionalTextfield': false,
            'multipleSelection': false
        })


        if (this.elementId > 0) {
            console.log("elementID > 0");
            this.surveys.loadClosedQuestionDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(closedQuestionElement => {
                this.closedQuestionElement = closedQuestionElement;
                console.log(closedQuestionElement);

                this.closedQuestionForm.controls['elementId'].setValue(this.closedQuestionElement.elementId);
                this.closedQuestionForm.controls['elementTitle'].setValue(this.closedQuestionElement.elementTitle);
                this.closedQuestionForm.controls['situation'].setValue(this.closedQuestionElement.situation);
                this.closedQuestionForm.controls['questiontext'].setValue(this.closedQuestionElement.questiontext);
                this.closedQuestionForm.controls['answer1'].setValue(this.closedQuestionElement.answer1);
                this.closedQuestionForm.controls['answer2'].setValue(this.closedQuestionElement.answer2);
                this.closedQuestionForm.controls['answer3'].setValue(this.closedQuestionElement.answer3);
                this.closedQuestionForm.controls['answer4'].setValue(this.closedQuestionElement.answer4);
                this.closedQuestionForm.controls['answer5'].setValue(this.closedQuestionElement.answer5);
                this.closedQuestionForm.controls['answer6'].setValue(this.closedQuestionElement.answer6);
                this.closedQuestionForm.controls['optionalTextfield'].setValue(this.closedQuestionElement.optionalTextfield);
                this.closedQuestionForm.controls['multipleSelection'].setValue(this.closedQuestionElement.multipleSelection);

            })
        } 

    }

  
    submitClosedQuestionElement(closedQuestion: ClosedQuestion) {

        if (0 == closedQuestion.elementId || null == closedQuestion.elementId || undefined == closedQuestion.elementId) {

            this.surveys.createClosedQuestionElement(closedQuestion).subscribe(
                (result) => {
                    console.log('Result received');
                    console.log("Result:  " + result);

                    this.closedQuestionForm.controls['elementId'].setValue(result.elementId);

                    this.presentToast("Element erfolgreich erstellt");
                },

                err => {
                    this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
                }
            );

        } else {
            this.surveys.updateClosedQuestionElement(closedQuestion).subscribe((result) => {
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
