import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PersonalData } from '../../models/survey-elements/personalData';

import { Evaluation } from '../../models/evaluation';
import { Surveys } from '../../providers/surveys';

import { SurveyElementList } from '../../models/evaluation-elements/surveyElementList';
import { PersonalDataEvaluationList } from '../../models/evaluation-elements/personalDataEvaluationList';
import { ClosedQuestionEvaluationList } from '../../models/evaluation-elements/closedQuestionEvaluationList';
import { ScoreTableEvaluationList } from '../../models/evaluation-elements/scoreTableEvaluationList';


import { ChartWrapper } from '../../models/evaluation-elements/chartWrapper';

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
    scoreTable: ScoreTableEvaluationList;

    public options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public userTestStatus: { datasets: Array<any>, label: Array<any>, type: string, elementTitle: string, elementId: number }[] = [];


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

                if (this.surveyElement.elementType == 2) {
                    for (this.personalData of JSON.parse(JSON.stringify(this.evaluationObjects.personalDataEvaluationList))) {
                        console.log(this.surveyElement.elementType);

                        if (this.surveyElement.elementId == this.personalData.elementId) {
                            console.log(this.personalData);
                            if (this.personalData.ages.length > 0) {
                                this.userTestStatus.push({
                                    "datasets": [
                                        {
                                            label: "Alter",
                                            data: this.personalData.ages
                                        }
                                    ],
                                    "label": this.personalData.ages, "type": "line", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId
                                });
                            }
                            if (this.personalData.locationCount.length > 0) {
                                var location = [];
                                var counter = [];
                                for (var locationString of this.personalData.locationCount) {
                                    location.push(locationString.location);
                                }

                                for (var locationString of this.personalData.locationCount) {
                                    counter.push(locationString.count);
                                }

                                this.userTestStatus.push({
                                    "datasets": [
                                        {
                                            label: "Wohnorte",
                                            data: counter
                                        }
                                    ],"label": location, "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId  });
                            }
                            if (this.personalData.femaleCounter > 0 || this.personalData.maleCounter > 0) {
                                var counter = [];
                                counter.push(this.personalData.femaleCounter);
                                counter.push(this.personalData.maleCounter);

                                this.userTestStatus.push({
                                    "datasets": [
                                        {
                                            label: "# of Votes",
                                            data: counter
                                        }
                                    ], "label": ["weiblich", "männlich"], "type": "doughnut", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId  });

                            }

                            // ToDo: average etc.
                        }
                    }
                }
                if (this.surveyElement.elementType == 3) {
                    for (this.closedQuestion of JSON.parse(JSON.stringify(this.evaluationObjects.closedQuestionEvaluationList))) {
                        console.log(this.surveyElement.elementType);

                        if (this.surveyElement.elementId == this.closedQuestion.elementId) {
                            console.log("closedQuestion:  " + JSON.stringify(this.closedQuestion));
                            var answersLabels = [];
                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer1);
                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer2);
                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer3);
                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer4);
                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer5);
                            answersLabels.push(this.closedQuestion.closedAnswerCounter.answer6);

                            var answers = [];
                            answers.push(this.closedQuestion.closedAnswerCounter.answer1c);
                            answers.push(this.closedQuestion.closedAnswerCounter.answer2c);
                            answers.push(this.closedQuestion.closedAnswerCounter.answer3c);
                            answers.push(this.closedQuestion.closedAnswerCounter.answer4c);
                            answers.push(this.closedQuestion.closedAnswerCounter.answer5c);
                            answers.push(this.closedQuestion.closedAnswerCounter.answer6c);

                            this.userTestStatus.push({
                                "datasets": [
                                    {
                                        label: "Geschlossene Fragen",
                                        data: answers
                                    }
                                ], "label": answersLabels, "type": "pie", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId  });

                        }

                        // ToDO: Textfield
                    }

                }

                if (this.surveyElement.elementType == 5) {
                    for (this.scoreTable of JSON.parse(JSON.stringify(this.evaluationObjects.scoreTableEvaluationList))) {
                        console.log(this.surveyElement.elementType);

                        if (this.surveyElement.elementId == this.scoreTable.elementId) {
                            console.log("scoreTable:  " + JSON.stringify(this.scoreTable));

                            var answers = [];
                            answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c1);
                            answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c2);
                            answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c3);
                            answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c4);
                            answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c5);
                            answers.push(this.scoreTable.scoreTableAnswerCounter.answer1c0);

                            this.userTestStatus.push({
                                "datasets": [
                                    {
                                        label: this.scoreTable.scoreTableAnswerCounter.criterion1,
                                        data: answers
                                    }
                                ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId });


                            //Kriterium 2
                            var answers2 = [];
                            answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c1);
                            answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c2);
                            answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c3);
                            answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c4);
                            answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c5);
                            answers2.push(this.scoreTable.scoreTableAnswerCounter.answer2c0);

                            this.userTestStatus.push({
                                "datasets": [
                                    {
                                        label: this.scoreTable.scoreTableAnswerCounter.criterion2,
                                        data: answers2
                                    }
                                ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId
                            });

                            //Kriterium 3
                            var answers3 = [];
                            answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c1);
                            answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c2);
                            answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c3);
                            answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c4);
                            answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c5);
                            answers3.push(this.scoreTable.scoreTableAnswerCounter.answer3c0);

                            this.userTestStatus.push({
                                "datasets": [
                                    {
                                        label: this.scoreTable.scoreTableAnswerCounter.criterion3,
                                        data: answers3
                                    }
                                ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId
                            });

                            //Kriterium 4
                            var answers4 = [];
                            answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c1);
                            answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c2);
                            answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c3);
                            answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c4);
                            answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c5);
                            answers4.push(this.scoreTable.scoreTableAnswerCounter.answer4c0);

                            this.userTestStatus.push({
                                "datasets": [
                                    {
                                        label: this.scoreTable.scoreTableAnswerCounter.criterion4,
                                        data: answers4
                                    }
                                ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId
                            });


                            //Kriterium 5
                            var answers5 = [];
                            answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c1);
                            answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c2);
                            answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c3);
                            answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c4);
                            answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c5);
                            answers5.push(this.scoreTable.scoreTableAnswerCounter.answer5c0);

                            this.userTestStatus.push({
                                "datasets": [
                                    {
                                        label: this.scoreTable.scoreTableAnswerCounter.criterion5,
                                        data: answers5
                                    }
                                ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId
                            });


                            //Kriterium 6
                            var answers6 = [];
                            answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c1);
                            answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c2);
                            answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c3);
                            answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c4);
                            answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c5);
                            answers6.push(this.scoreTable.scoreTableAnswerCounter.answer6c0);

                            this.userTestStatus.push({
                                "datasets": [
                                    {
                                        label: this.scoreTable.scoreTableAnswerCounter.criterion6,
                                        data: answers6
                                    }
                                ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar", "elementTitle": this.surveyElement.elementTitle, "elementId": this.surveyElement.elementId
                            });


                        }

                        // ToDO: Textfield
                    }
                }
            }

//            this.userTestStatus.push({ "data": [65, 59, 80, 81, 56, 55, 40], "label": ['January', 'February', 'March', 'April', 'May', 'June', 'July'], "type": "pie", "elementTitle": this.surveyElement.elementTitle });
            /*
            this.userTestStatus = [
                {"data": [65, 59, 80, 81, 56, 55, 40], "label": ['January', 'February', 'March', 'April', 'May', 'June', 'July'], "type": "pie"},
                {"data": [65, 59, 80, 81, 56, 55, 40], "label": ['January', 'February', 'March', 'April', 'May', 'June', 'July'], "type": "line" }
            ];
            */
        });



    }
     
}