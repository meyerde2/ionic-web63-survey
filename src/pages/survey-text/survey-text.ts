import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Text } from '../../models/survey-elements/text';
import { Surveys } from '../../providers/surveys';


@Component({
  selector: 'page-survey-text',
  templateUrl: 'survey-text.html'
})

export class SurveyTextPage {

    textForm: FormGroup;
    surveyId: number;
    elementId: number;
    elementType: number;

    textElement: Text;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder, private toastCtrl: ToastController, private viewCtrl: ViewController) {
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');
        console.log(this.surveyId);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyTextPage');
  }

  ngOnInit() {

      this.textForm = this.fb.group({
          'elementTitle': '',
          'text': '',
          'surveyId': this.surveyId,
          'elementId': ''
      })


      if (this.elementId > 0) {
          console.log("elementID >= 0");
          this.surveys.loadTextDetailsById(this.surveyId, this.elementId, this.elementType).subscribe(textElement => {
              this.textElement = textElement;
              console.log(textElement);

              this.textForm.controls['elementTitle'].setValue(this.textElement.elementTitle);
              this.textForm.controls['text'].setValue(this.textElement.text);
              this.textForm.controls['elementId'].setValue(this.textElement.elementId);
          })
      }

  }

  submitTextElement(value: any) {

      let text: Text;
      text = value;

      if (0 == text.elementId || null == text.elementId || undefined == text.elementId) {

          this.surveys.createTextElement(text).subscribe(
              (result) => {
                  console.log('Result received');
                  console.log("Result:  " + result);

                  this.textForm.controls['elementId'].setValue(result.elementId);

                  this.presentToast("Element erfolgreich erstellt");
              },

              err => {
                  this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
              }
          );

      } else {
          this.surveys.updateTextElement(text).subscribe((result) => {
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
