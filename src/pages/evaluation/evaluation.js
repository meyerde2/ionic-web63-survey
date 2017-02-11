var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Surveys } from '../../providers/surveys';
export var EvaluationPage = (function () {
    function EvaluationPage(navCtrl, navParams, surveysProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.surveysProvider = surveysProvider;
        this.surveyId = 0;
        this.options = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        this.evaluationCharts = [];
        this.surveyId = navParams.get('id');
    }
    EvaluationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad EvaluationPage');
        this.surveysProvider.loadSurveyEvaluation(this.surveyId).subscribe(function (data) {
            console.log("loadSurveyEvaluation:  " + JSON.stringify(data));
            _this.evaluationObjects = data;
            console.log("surveyElementList:  " + JSON.stringify(_this.evaluationObjects.surveyElementList));
            console.log("personalDataEvaluationList:  " + JSON.stringify(_this.evaluationObjects.personalDataEvaluationList));
            console.log("closedQuestionEvaluationList :  " + JSON.stringify(_this.evaluationObjects.closedQuestionEvaluationList));
            console.log("openQuestionEvaluationList:  " + JSON.stringify(_this.evaluationObjects.openQuestionEvaluationList));
            console.log("scoreTableEvaluationList:  " + JSON.stringify(_this.evaluationObjects.scoreTableEvaluationList));
            //this.surveyElement = JSON.stringify(this.evaluationObjects.surveyElementList);
            for (var _i = 0, _a = JSON.parse(JSON.stringify(_this.evaluationObjects.surveyElementList)); _i < _a.length; _i++) {
                _this.surveyElement = _a[_i];
                console.log(_this.surveyElement.elementType);
                //***************************************//
                //**********Personal Data****************//
                //***************************************//
                if (_this.surveyElement.elementType == 2) {
                    for (var _b = 0, _c = JSON.parse(JSON.stringify(_this.evaluationObjects.personalDataEvaluationList)); _b < _c.length; _b++) {
                        _this.personalData = _c[_b];
                        console.log(_this.surveyElement.elementType);
                        if (_this.surveyElement.elementId == _this.personalData.elementId) {
                            console.log(_this.personalData);
                            if (_this.personalData.ages != null && _this.personalData.ages.length > 0) {
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Alter",
                                            data: _this.personalData.ages
                                        }
                                    ],
                                    "label": _this.personalData.ages, "type": "line", "elementTitle": _this.surveyElement.elementTitle,
                                    "elementId": _this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.personalData.locationCount != null && _this.personalData.locationCount.length > 0) {
                                var location = [];
                                var counter = [];
                                for (var _d = 0, _e = _this.personalData.locationCount; _d < _e.length; _d++) {
                                    var locationString = _e[_d];
                                    location.push(locationString.location);
                                }
                                for (var _f = 0, _g = _this.personalData.locationCount; _f < _g.length; _f++) {
                                    var locationString = _g[_f];
                                    counter.push(locationString.count);
                                }
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Wohnorte",
                                            data: counter
                                        }
                                    ], "label": location, "type": "bar", "elementTitle": _this.surveyElement.elementTitle, "elementId": _this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.personalData.femaleCounter > 0 || _this.personalData.maleCounter > 0) {
                                var counter = [];
                                counter.push(_this.personalData.femaleCounter);
                                counter.push(_this.personalData.maleCounter);
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Geschlecht",
                                            data: counter
                                        }
                                    ], "label": ["weiblich", "männlich"], "type": "doughnut", "elementTitle": _this.surveyElement.elementTitle,
                                    "elementId": _this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.personalData.ageAverage > 0 && _this.personalData.ageMax > 0) {
                                _this.personalDataAgeData = { "ageMin": _this.personalData.ageMin, "ageMax": _this.personalData.ageMax, "ageMedian": _this.personalData.ageMedian, "ageAverage": _this.personalData.ageAverage, "standardDeviation": _this.personalData.standardDeviation };
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "test",
                                            data: counter
                                        }
                                    ], "label": ["weiblich", "männlich"], "type": "bar",
                                    "elementTitle": _this.surveyElement.elementTitle, "elementId": _this.surveyElement.elementId,
                                    "isPersonalAgeData": true, "personalAgeData": _this.personalDataAgeData, "isText": false, "text": null
                                });
                            }
                        }
                    }
                }
                //***************************************//
                //**********Closed Question***************//
                //***************************************//
                if (_this.surveyElement.elementType == 3) {
                    for (var _h = 0, _j = JSON.parse(JSON.stringify(_this.evaluationObjects.closedQuestionEvaluationList)); _h < _j.length; _h++) {
                        _this.closedQuestion = _j[_h];
                        console.log(_this.surveyElement.elementType);
                        if (_this.surveyElement.elementId == _this.closedQuestion.elementId) {
                            console.log("closedQuestion:  " + JSON.stringify(_this.closedQuestion));
                            var answersLabels = [];
                            var answers = [];
                            answersLabels.push(_this.closedQuestion.closedAnswerCounter.answer1);
                            answersLabels.push(_this.closedQuestion.closedAnswerCounter.answer2);
                            answers.push(_this.closedQuestion.closedAnswerCounter.answer1c);
                            answers.push(_this.closedQuestion.closedAnswerCounter.answer2c);
                            if (_this.closedQuestion.closedAnswerCounter.answer3.length > 0) {
                                answersLabels.push(_this.closedQuestion.closedAnswerCounter.answer3);
                                answers.push(_this.closedQuestion.closedAnswerCounter.answer3c);
                            }
                            if (_this.closedQuestion.closedAnswerCounter.answer4.length > 0) {
                                answersLabels.push(_this.closedQuestion.closedAnswerCounter.answer4);
                                answers.push(_this.closedQuestion.closedAnswerCounter.answer4c);
                            }
                            if (_this.closedQuestion.closedAnswerCounter.answer5.length > 0) {
                                answersLabels.push(_this.closedQuestion.closedAnswerCounter.answer5);
                                answers.push(_this.closedQuestion.closedAnswerCounter.answer5c);
                            }
                            if (_this.closedQuestion.closedAnswerCounter.answer6.length > 0) {
                                answersLabels.push(_this.closedQuestion.closedAnswerCounter.answer6);
                                answers.push(_this.closedQuestion.closedAnswerCounter.answer6c);
                            }
                            _this.evaluationCharts.push({
                                "datasets": [
                                    {
                                        label: "Geschlossene Fragen",
                                        data: answers
                                    }
                                ], "label": answersLabels, "type": "pie", "elementTitle": _this.surveyElement.elementTitle,
                                "elementId": _this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                            });
                        }
                        if (_this.closedQuestion.optionalTextfield.length > 0) {
                            _this.evaluationCharts.push({
                                "datasets": [
                                    {
                                        label: "Geschlossene Fragen",
                                        data: answers
                                    }
                                ], "label": answersLabels, "type": "pie", "elementTitle": _this.surveyElement.elementTitle,
                                "elementId": _this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": true, "text": _this.closedQuestion.optionalTextfield
                            });
                        }
                    }
                }
                //***************************************//
                //**********Open Question***************//
                //***************************************//
                if (_this.surveyElement.elementType == 4) {
                    for (var _k = 0, _l = JSON.parse(JSON.stringify(_this.evaluationObjects.openQuestionEvaluationList)); _k < _l.length; _k++) {
                        _this.openQuestion = _l[_k];
                        console.log(_this.surveyElement.elementType);
                        if (_this.surveyElement.elementId == _this.openQuestion.elementId) {
                            if (_this.openQuestion.text.length > 0) {
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: "Offene Fragen",
                                            data: answers
                                        }
                                    ], "label": answersLabels, "type": "pie", "elementTitle": _this.surveyElement.elementTitle,
                                    "elementId": _this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": true, "text": _this.openQuestion.text
                                });
                            }
                        }
                    }
                }
                //***************************************//
                //**********ScoreTable****************//
                //***************************************//
                if (_this.surveyElement.elementType == 5) {
                    for (var _m = 0, _o = JSON.parse(JSON.stringify(_this.evaluationObjects.scoreTableEvaluationList)); _m < _o.length; _m++) {
                        _this.scoreTable = _o[_m];
                        console.log(_this.surveyElement.elementType);
                        if (_this.surveyElement.elementId == _this.scoreTable.elementId) {
                            console.log("scoreTable:  " + JSON.stringify(_this.scoreTable));
                            if (_this.scoreTable.scoreTableAnswerCounter.criterion1 != null && _this.scoreTable.scoreTableAnswerCounter.criterion1.length > 0) {
                                var answers = [];
                                answers.push(_this.scoreTable.scoreTableAnswerCounter.answer1c1);
                                answers.push(_this.scoreTable.scoreTableAnswerCounter.answer1c2);
                                answers.push(_this.scoreTable.scoreTableAnswerCounter.answer1c3);
                                answers.push(_this.scoreTable.scoreTableAnswerCounter.answer1c4);
                                answers.push(_this.scoreTable.scoreTableAnswerCounter.answer1c5);
                                answers.push(_this.scoreTable.scoreTableAnswerCounter.answer1c0);
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: _this.scoreTable.scoreTableAnswerCounter.criterion1,
                                            data: answers
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"], "type": "bar",
                                    "elementTitle": _this.surveyElement.elementTitle, "elementId": _this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.scoreTable.scoreTableAnswerCounter.criterion2 != null && _this.scoreTable.scoreTableAnswerCounter.criterion2.length > 0) {
                                var answers2 = [];
                                answers2.push(_this.scoreTable.scoreTableAnswerCounter.answer2c1);
                                answers2.push(_this.scoreTable.scoreTableAnswerCounter.answer2c2);
                                answers2.push(_this.scoreTable.scoreTableAnswerCounter.answer2c3);
                                answers2.push(_this.scoreTable.scoreTableAnswerCounter.answer2c4);
                                answers2.push(_this.scoreTable.scoreTableAnswerCounter.answer2c5);
                                answers2.push(_this.scoreTable.scoreTableAnswerCounter.answer2c0);
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: _this.scoreTable.scoreTableAnswerCounter.criterion2,
                                            data: answers2
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": _this.surveyElement.elementTitle,
                                    "elementId": _this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.scoreTable.scoreTableAnswerCounter.criterion3 != null && _this.scoreTable.scoreTableAnswerCounter.criterion3.length > 0) {
                                var answers3 = [];
                                answers3.push(_this.scoreTable.scoreTableAnswerCounter.answer3c1);
                                answers3.push(_this.scoreTable.scoreTableAnswerCounter.answer3c2);
                                answers3.push(_this.scoreTable.scoreTableAnswerCounter.answer3c3);
                                answers3.push(_this.scoreTable.scoreTableAnswerCounter.answer3c4);
                                answers3.push(_this.scoreTable.scoreTableAnswerCounter.answer3c5);
                                answers3.push(_this.scoreTable.scoreTableAnswerCounter.answer3c0);
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: _this.scoreTable.scoreTableAnswerCounter.criterion3,
                                            data: answers3
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": _this.surveyElement.elementTitle,
                                    "elementId": _this.surveyElement.elementId, "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.scoreTable.scoreTableAnswerCounter.criterion4 != null && _this.scoreTable.scoreTableAnswerCounter.criterion4.length > 0) {
                                var answers4 = [];
                                answers4.push(_this.scoreTable.scoreTableAnswerCounter.answer4c1);
                                answers4.push(_this.scoreTable.scoreTableAnswerCounter.answer4c2);
                                answers4.push(_this.scoreTable.scoreTableAnswerCounter.answer4c3);
                                answers4.push(_this.scoreTable.scoreTableAnswerCounter.answer4c4);
                                answers4.push(_this.scoreTable.scoreTableAnswerCounter.answer4c5);
                                answers4.push(_this.scoreTable.scoreTableAnswerCounter.answer4c0);
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: _this.scoreTable.scoreTableAnswerCounter.criterion4,
                                            data: answers4
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": _this.surveyElement.elementTitle, "elementId": _this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.scoreTable.scoreTableAnswerCounter.criterion5 != null && _this.scoreTable.scoreTableAnswerCounter.criterion5.length > 0) {
                                var answers5 = [];
                                answers5.push(_this.scoreTable.scoreTableAnswerCounter.answer5c1);
                                answers5.push(_this.scoreTable.scoreTableAnswerCounter.answer5c2);
                                answers5.push(_this.scoreTable.scoreTableAnswerCounter.answer5c3);
                                answers5.push(_this.scoreTable.scoreTableAnswerCounter.answer5c4);
                                answers5.push(_this.scoreTable.scoreTableAnswerCounter.answer5c5);
                                answers5.push(_this.scoreTable.scoreTableAnswerCounter.answer5c0);
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: _this.scoreTable.scoreTableAnswerCounter.criterion5,
                                            data: answers5
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": _this.surveyElement.elementTitle, "elementId": _this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                            if (_this.scoreTable.scoreTableAnswerCounter.criterion6 != null && _this.scoreTable.scoreTableAnswerCounter.criterion6.length > 0) {
                                var answers6 = [];
                                answers6.push(_this.scoreTable.scoreTableAnswerCounter.answer6c1);
                                answers6.push(_this.scoreTable.scoreTableAnswerCounter.answer6c2);
                                answers6.push(_this.scoreTable.scoreTableAnswerCounter.answer6c3);
                                answers6.push(_this.scoreTable.scoreTableAnswerCounter.answer6c4);
                                answers6.push(_this.scoreTable.scoreTableAnswerCounter.answer6c5);
                                answers6.push(_this.scoreTable.scoreTableAnswerCounter.answer6c0);
                                _this.evaluationCharts.push({
                                    "datasets": [
                                        {
                                            label: _this.scoreTable.scoreTableAnswerCounter.criterion6,
                                            data: answers6
                                        }
                                    ], "label": ["gar nicht zufrieden", "unzufrieden", "eher unzufrieden", "eher zufrieden", "zufrieden", "nicht beurteilbar"],
                                    "type": "bar", "elementTitle": _this.surveyElement.elementTitle, "elementId": _this.surveyElement.elementId,
                                    "isPersonalAgeData": false, "personalAgeData": null, "isText": false, "text": null
                                });
                            }
                        }
                    }
                }
            }
        });
    };
    EvaluationPage = __decorate([
        Component({
            selector: 'page-evaluation',
            templateUrl: 'evaluation.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Surveys])
    ], EvaluationPage);
    return EvaluationPage;
}());
//# sourceMappingURL=evaluation.js.map