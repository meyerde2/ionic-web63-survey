import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PersonalData } from '../../models/survey-elements/personalData';
import { Evaluation } from '../../models/evaluation';
import { Surveys } from '../../providers/surveys';

import { SurveyElementList } from '../../models/evaluation-elements/surveyElementList';
import { PersonalDataEvaluationList } from '../../models/evaluation-elements/personalDataEvaluationList';
import { ClosedQuestionEvaluationList } from '../../models/evaluation-elements/closedQuestionEvaluationList';
import { OpenQuestionEvaluationList } from '../../models/evaluation-elements/openQuestionEvaluationList';
import { ScoreTableEvaluationList } from '../../models/evaluation-elements/scoreTableEvaluationList';
import { PersonalDataAgeData } from '../../models/evaluation-elements/helper/personalDataAgeData';


import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@Component({
    selector: 'page-evaluation',
    templateUrl: 'evaluation.html'
})

export class EvaluationPage {

    surveyId = 0;

    evaluationObjects: Evaluation;
    surveyElement: SurveyElementList;
    personalData: PersonalDataEvaluationList;
    closedQuestion: ClosedQuestionEvaluationList;
    openQuestion: OpenQuestionEvaluationList;
    scoreTable: ScoreTableEvaluationList;
    personalDataAgeData: PersonalDataAgeData;

    public options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public evaluationCharts: { datasets: Array<any>, label: Array<any>, type: string, elementTitle: string, elementId: number, isPersonalAgeData: boolean, personalAgeData: PersonalDataAgeData, isText: boolean, text: Array<any> }[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private surveysProvider: Surveys) {
        this.surveyId = navParams.get('id');
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad EvaluationPage');

        this.surveysProvider.loadSurveyEvaluation(this.surveyId).subscribe(data => {
            console.log("loadSurveyEvaluation:  " + JSON.stringify(data));
            this.evaluationObjects = data;

            console.log("surveyElementList:  " + JSON.stringify(this.evaluationObjects.surveyElementList));
            console.log("personalDataEvaluationList:  " + JSON.stringify(this.evaluationObjects.personalDataEvaluationList));
            console.log("closedQuestionEvaluationList :  " + JSON.stringify(this.evaluationObjects.closedQuestionEvaluationList));
            console.log("openQuestionEvaluationList:  " + JSON.stringify(this.evaluationObjects.openQuestionEvaluationList));
            console.log("scoreTableEvaluationList:  " + JSON.stringify(this.evaluationObjects.scoreTableEvaluationList));

            //this.surveyElement = JSON.stringify(this.evaluationObjects.surveyElementList);

            for (this.surveyElement of JSON.parse(JSON.stringify(this.evaluationObjects.surveyElementList))) {
                console.log(this.surveyElement.elementType);

                //***************************************//
                //**********Personal Data****************//
                //***************************************//
                if (this.surveyElement.elementType == 2) {

                    for (this.personalData of JSON.parse(JSON.stringify(this.evaluationObjects.personalDataEvaluationList))) {
                        console.log(this.surveyElement.elementType);

                        if (this.surveyElement.elementId == this.personalData.elementId) {

                            console.log(this.personalData);

                           
                            if (this.personalData.ages != null && this.personalData.ages.length > 0) {
                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Alter",
                                            data: this.personalData.ages
                                        }
                                    ],
                                    "label": this.personalData.ages, "type": "line", "elementTitle": this.surveyElement.elementTitle,
                                    "elementId": this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }

                           
                            if (this.personalData.locationCount != null && this.personalData.locationCount.length > 0) {
                                var location = [];
                                var counter = [];
                                for (var locationString of this.personalData.locationCount) {
                                    location.push(locationString.location);
                                }

                                for (var locationString of this.personalData.locationCount) {
                                    counter.push(locationString.count);
                                }

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Wohnorte",
                                            data: counter
                                        }
                                    ], "label": location, "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            

                            if (this.personalData.femaleCounter > 0 || this.personalData.maleCounter > 0) {
                                var counter = [];
                                counter.push(this.personalData.femaleCounter);
                                counter.push(this.personalData.maleCounter);

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Geschlecht",
                                            data: counter
                                        }
                                    ], "label": ["weiblich", "männlich"], "type": "doughnut", "elementTitle": this.surveyElement.elementTitle,
                                    "elementId": this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });

                            }

                            if (this.personalData.ageAverage > 0 && this.personalData.ageMax > 0) {
                                this.personalDataAgeData = { "ageMin": this.personalData.ageMin, "ageMax": this.personalData.ageMax, "ageMedian": this.personalData.ageMedian, "ageAverage": this.personalData.ageAverage, "standardDeviation": this.personalData.standardDeviation };
                                
                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "test",
                                            data: counter
                                        }
                                    ], "label": ["weiblich", "männlich"], "type": "bar", 
                                    "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId,
                                    "isPersonalAgeData": true, "personalAgeData": this.personalDataAgeData, "isText": false, "text": null
                                });
                                
                            }
                        }
                    }
                }

                //***************************************//
                //**********Closed Question***************//
                //***************************************//

                if (this.surveyElement.elementType == 3) {
                    for (this.closedQuestion of JSON.parse(JSON.stringify(this.evaluationObjects.closedQuestionEvaluationList))) {
                        console.log(this.surveyElement.elementType);

                        if (this.surveyElement.elementId == this.closedQuestion.elementId) {
                            console.log("closedQuestion:  " + JSON.stringify(this.closedQuestion));
                            var answersLabels = [];
                            var answers = [];

                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer1);
                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer2);

                            answers.push(this.closedQuestion.closedAnswerCounter.answer1c);
                            answers.push(this.closedQuestion.closedAnswerCounter.answer2c);
                            
                            if (this.closedQuestion.closedAnswerCounter.answer3.length > 0) {
                                answersLabels.push(this.closedQuestion.closedAnswerCounter.answer3);
                                answers.push(this.closedQuestion.closedAnswerCounter.answer3c);
                            } 
                            if (this.closedQuestion.closedAnswerCounter.answer4.length > 0) {
                                answersLabels.push(this.closedQuestion.closedAnswerCounter.answer4);
                                answers.push(this.closedQuestion.closedAnswerCounter.answer4c);
                            } 
                            if (this.closedQuestion.closedAnswerCounter.answer5.length > 0) {
                                answersLabels.push(this.closedQuestion.closedAnswerCounter.answer5);
                                answers.push(this.closedQuestion.closedAnswerCounter.answer5c);
                            } 
                            if (this.closedQuestion.closedAnswerCounter.answer6.length > 0) {
                                answersLabels.push(this.closedQuestion.closedAnswerCounter.answer6);
                                answers.push(this.closedQuestion.closedAnswerCounter.answer6c);
                            }
                            

                            this.evaluationCharts.push({
                                "datasets": [
                                    {
                                        label: "Geschlossene Fragen",
                                        data: answers
                                    }
                                ], "label": answersLabels, "type": "pie", "elementTitle": this.surveyElement.elementTitle,
                                "elementId": this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                            });
                        }

                        if (this.closedQuestion.optionalTextfield.length > 0) {

                            this.evaluationCharts.push({
                                "datasets": [
                                    {
                                        label: "Geschlossene Fragen",
                                        data: answers
                                    }
                                ], "label": answersLabels, "type": "pie", "elementTitle": this.surveyElement.elementTitle,
                                "elementId": this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": true, "text": this.closedQuestion.optionalTextfield
                            });
                        }
                    }

                }

                //***************************************//
                //**********Open Question***************//
                //***************************************//

                if (this.surveyElement.elementType == 4) {
                    for (this.openQuestion of JSON.parse(JSON.stringify(this.evaluationObjects.openQuestionEvaluationList))) {
                        console.log(this.surveyElement.elementType);

                        if (this.surveyElement.elementId == this.openQuestion.elementId) {

                            if (this.openQuestion.text.length > 0) {

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Offene Fragen",
                                            data: answers
                                        }
                                    ], "label": answersLabels, "type": "pie", "elementTitle": this.surveyElement.elementTitle,
                                    "elementId": this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": true, "text": this.openQuestion.text
                                });
                            }
                        }
                    }

                }

                //***************************************//
                //**********ScoreTable****************//
                //***************************************//
                if (this.surveyElement.elementType == 5) {
                    for (this.scoreTable of JSON.parse(JSON.stringify(this.evaluationObjects.scoreTableEvaluationList))) {
                        console.log(this.surveyElement.elementType);

                        if (this.surveyElement.elementId == this.scoreTable.elementId) {
                            console.log("scoreTable:  " + JSON.stringify(this.scoreTable));

                            if (this.scoreTable.scoreTableAnswerCounter.criterion1 != null && this.scoreTable.scoreTableAnswerCounter.criterion1.length > 0) {
                                var answers = [];
                                answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c1);
                                answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c2);
                                answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c3);
                                answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c4);
                                answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c5);
                                answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c0);

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: this.scoreTable.scoreTableAnswerCounter.criterion1,
                                            data: answers
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar",
                                    "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }

                            if (this.scoreTable.scoreTableAnswerCounter.criterion2 != null && this.scoreTable.scoreTableAnswerCounter.criterion2.length > 0) {
                                var answers2 = [];
                                answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c1);
                                answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c2);
                                answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c3);
                                answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c4);
                                answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c5);
                                answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c0);

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: this.scoreTable.scoreTableAnswerCounter.criterion2,
                                            data: answers2
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": this.surveyElement.elementTitle,
                                    "elementId": this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }


                            if (this.scoreTable.scoreTableAnswerCounter.criterion3 != null && this.scoreTable.scoreTableAnswerCounter.criterion3.length > 0) {
                                var answers3 = [];
                                answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c1);
                                answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c2);
                                answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c3);
                                answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c4);
                                answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c5);
                                answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c0);

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: this.scoreTable.scoreTableAnswerCounter.criterion3,
                                            data: answers3
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": this.surveyElement.elementTitle,
                                    "elementId": this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }

                            if (this.scoreTable.scoreTableAnswerCounter.criterion4 != null && this.scoreTable.scoreTableAnswerCounter.criterion4.length > 0) {
                                var answers4 = [];
                                answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c1);
                                answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c2);
                                answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c3);
                                answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c4);
                                answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c5);
                                answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c0);

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: this.scoreTable.scoreTableAnswerCounter.criterion4,
                                            data: answers4
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }

                            if (this.scoreTable.scoreTableAnswerCounter.criterion5 != null && this.scoreTable.scoreTableAnswerCounter.criterion5.length > 0) {
                                var answers5 = [];
                                answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c1);
                                answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c2);
                                answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c3);
                                answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c4);
                                answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c5);
                                answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c0);

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: this.scoreTable.scoreTableAnswerCounter.criterion5,
                                            data: answers5
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }

                            if (this.scoreTable.scoreTableAnswerCounter.criterion6 != null && this.scoreTable.scoreTableAnswerCounter.criterion6.length > 0) {
                                var answers6 = [];
                                answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c1);
                                answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c2);
                                answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c3);
                                answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c4);
                                answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c5);
                                answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c0);

                                this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: this.scoreTable.scoreTableAnswerCounter.criterion6,
                                            data: answers6
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }

                        }

                        // ToDO: Textfield
                    }
                }
            }

        });
    }
}