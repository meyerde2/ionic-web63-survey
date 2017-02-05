import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PersonalData } from '../../models/survey-elements/personalData';
import { Surveys } from '../../providers/surveys';

@Component({
  selector: 'page-survey-personal-data',
  templateUrl: 'survey-personal-data.html'
})
export class SurveyPersonalDataPage {

    personalDataForm: FormGroup;
    surveyId: number;
    elementId: number;
    elementType: number;
    personalDataElement: PersonalData;

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveys: Surveys, private fb: FormBuilder, private toastCtrl: ToastController, private viewCtrl: ViewController) {
        this.surveyId = navParams.get('surveyId');
        this.elementId = navParams.get('elementId');
        this.elementType = navParams.get('elementType');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPersonalDataPage');
  }

  ngOnInit() {

      this.personalDataForm = this.fb.group({
          'surveyId': this.surveyId,
          'elementId': '',
          'elementTitle': '',
          'firstname': false,
          'lastname': false,
          'age': false,
          'gender': false,
          'location': false
      })

      if (this.elementId > 0) {
          console.log("elementID > 0");
          this.surveys.loadPersonalDataById(this.surveyId, this.elementId, this.elementType).subscribe(personalDataElement => {
              this.personalDataElement = personalDataElement;
              console.log(personalDataElement);

              this.personalDataForm.controls['surveyId'].setValue(this.personalDataElement.surveyId);
              this.personalDataForm.controls['elementId'].setValue(this.personalDataElement.elementId);
              this.personalDataForm.controls['elementTitle'].setValue(this.personalDataElement.elementTitle);

          })
      }

  }

  submitPersonalDataElement(personalData: PersonalData) {

      if (0 == personalData.elementId || null == personalData.elementId || undefined == personalData.elementId) {

          this.surveys.createPersonalDataElement(personalData).subscribe(
              (result) => {
                  console.log('Result received');
                  console.log("Result:  " + result);

                  this.personalDataForm.controls['elementId'].setValue(result.elementId);

                  this.presentToast("Element erfolgreich erstellt");
              },

              err => {
                  this.presentToast("Beim Erstellen ist ein Fehler aufgetreten");
              }
          );

      } else {
          this.surveys.updatePersonalDataElement(personalData).subscribe((result) => {
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
