import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NgIf } from 'angular2/common';
import { ModalController } from 'ionic-angular';

import { Surveys } from '../../providers/surveys';
import { SurveyEntry } from '../../models/surveyEntry';

import { SurveyDetailsPage } from '../survey-details/survey-details';
import { SurveyCreationPage } from '../survey-creation/survey-creation';


@Component({
    selector: 'page-survey-overview',
    templateUrl: 'survey-overview.html'
})
export class SurveyOverviewPage {

    surveys: SurveyEntry[]


    constructor(public navCtrl: NavController, public navParams: NavParams, private surveysProvider: Surveys, public modalCtrl: ModalController) {
        this.surveysProvider.getUsername();
    }

    ngOnInit() {
       
 

        this.surveysProvider.load().subscribe((data) => {
            this.surveys = data;
            console.log(JSON.stringify(data));
        });
   
    
    }

    ngAfterViewInit() {

    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SurveyOverviewPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter SurveyOverviewPage');
        this.ngOnInit();
    }

    goToSurveyDetails(id: number) {
        this.navCtrl.push(SurveyDetailsPage, { id });
    }

    goToNewSurvey() {

        let modal = this.modalCtrl.create(SurveyCreationPage);
        modal.onDidDismiss(data => {
            console.log(data);
            this.ngOnInit();
        });
        modal.present();
    }

}