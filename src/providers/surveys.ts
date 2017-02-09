import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { SurveyEntry } from '../models/surveyEntry';
import { SurveyElement } from '../models/surveyElement';
import { ClosedQuestion } from '../models/survey-elements/closedQuestion';
import { OpenQuestion} from '../models/survey-elements/openQuestion';
import { PersonalData} from '../models/survey-elements/personalData';
import { ScoreTable } from '../models/survey-elements/scoreTable';
import { Text } from '../models/survey-elements/text';



@Injectable()
export class Surveys {

    //surveyUrl = 'http://192.168.178.40:4567';
    surveyUrl = 'http://localhost:4567';
    textElementGlobal: Text;


    constructor(public http: Http) {
        console.log('Hello Survey Provider');
    }


    // Load all surveys
    load(): Observable<SurveyEntry[]> {

        return this.http.get(`${this.surveyUrl}/getAllSurveyEntries/`)
            .map(res => <SurveyEntry[]>res.json());
    }

    updateSurveyEntry(survey: SurveyEntry) {


        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        console.log("survey provider: " + JSON.stringify(survey));
        console.log("URL: " + `${this.surveyUrl}/updateSurvey/${survey.surveyId}/`);

        console.log("survey.surveyId:  " + survey.surveyId);

        if (survey.surveyId != undefined && survey.surveyId > 0) {
            this.http.put(`${this.surveyUrl}/updateSurvey/${survey.surveyId}/`, JSON.stringify(survey), { headers: headers })
                .map(res => <SurveyEntry[]>res.json(),
                error => {
                    console.error("error updating survey!");
                    return Observable.throw(error);
                }).subscribe();
            console.log("URL: " + `${this.surveyUrl}/updateSurvey/${survey.surveyId}/`);
        } else {
            console.log("Update not executed");
        }

    }



    // Get survey by id
    loadDetails(id: number): Observable<SurveyEntry> {
        return this.http.get(`${this.surveyUrl}/getSurveyById/${id}/`)
            .map(res => <SurveyEntry>(res.json()))
    }


    // Get survey elements by surveyId
    loadSurveyElementsBySurveyID(id: number): Observable<SurveyElement[]> {
        return this.http.get(`${this.surveyUrl}/getSurveyElementsById/${id}/`)
            .map(res => <SurveyElement[]>(res.json()))
    }


    //******************************//
    // get different element data
    //******************************//

    loadTextDetailsById(surveyId: number, elementId: number, elementType: number): Observable<Text> {

        return this.http.get(`${this.surveyUrl}/survey/${surveyId}/element/${elementId}/elementtype/${elementType}/`)
            .map(res => <Text>(res.json()))
    }


    loadPersonalDataById(surveyId: number, elementId: number, elementType: number): Observable<PersonalData> {

        return this.http.get(`${this.surveyUrl}/survey/${surveyId}/element/${elementId}/elementtype/${elementType}/`)
            .map(res => <PersonalData>(res.json()))
    }

    loadClosedQuestionDetailsById(surveyId: number, elementId: number, elementType: number): Observable<ClosedQuestion> {

        return this.http.get(`${this.surveyUrl}/survey/${surveyId}/element/${elementId}/elementtype/${elementType}/`)
            .map(res => <ClosedQuestion>(res.json()))
    }

    loadOpenQuestionDetailsById(surveyId: number, elementId: number, elementType: number): Observable<OpenQuestion> {

        return this.http.get(`${this.surveyUrl}/survey/${surveyId}/element/${elementId}/elementtype/${elementType}/`)
            .map(res => <OpenQuestion>(res.json()))
    }

    loadScoreTableDetailsById(surveyId: number, elementId: number, elementType: number): Observable<ScoreTable> {

        return this.http.get(`${this.surveyUrl}/survey/${surveyId}/element/${elementId}/elementtype/${elementType}/`)
            .map(res => <ScoreTable>(res.json()))
    }


    createTextElement(text: Text) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        console.log("before put request");
        return this.http.put(`${this.surveyUrl}/jsonTextupload/`, JSON.stringify(text), { headers: headers })
            .map(res => <Text>res.json())
    }


    updateTextElement(text: Text) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonTextuploadUpdate/`, JSON.stringify(text), { headers: headers })
            .map(res => <Text>res.json());
    }

    createPersonalDataElement(personalData: PersonalData) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonPersonaldata/`, JSON.stringify(personalData), { headers: headers })
            .map(res => <Text>res.json())
    }

    updatePersonalDataElement(personalData: PersonalData) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonPersonaldataUpdate/`, JSON.stringify(personalData), { headers: headers })
            .map(res => <Text>res.json());
    }

    createClosedQuestionElement(closedQuestion: ClosedQuestion) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonClosedQuestion/`, JSON.stringify(closedQuestion), { headers: headers })
            .map(res => <Text>res.json())
    }

    updateClosedQuestionElement(closedQuestion: ClosedQuestion) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonClosedQuestionUpdate/`, JSON.stringify(closedQuestion), { headers: headers })
            .map(res => <Text>res.json());
    }

    createOpenQuestionElement(openQuestion: OpenQuestion) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonOpenQuestion/`, JSON.stringify(openQuestion), { headers: headers })
            .map(res => <Text>res.json())
    }

    updateOpenQuestionElement(openQuestion: OpenQuestion) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonOpenQuestionUpdate/`, JSON.stringify(openQuestion), { headers: headers })
            .map(res => <Text>res.json());
    }


    createScoreTableElement(scoreTable: ScoreTable) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonScoreTable/`, JSON.stringify(scoreTable), { headers: headers })
            .map(res => <Text>res.json())
    }

    updateScoreTableElement(scoreTable: ScoreTable) {

        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        });

        return this.http.put(`${this.surveyUrl}/jsonScoreTableUpdate/`, JSON.stringify(scoreTable), { headers: headers })
            .map(res => <Text>res.json());
    }


    // Get survey evaluation by id
    loadSurveyEvaluation(id: number): Observable<any> {
        return this.http.get(`${this.surveyUrl}/jsonEvaluation/${id}/`)
            .map(res => (res.json()))
    }

    deleteSurvey(id: number) {
        return this.http.get(`${this.surveyUrl}/jsonDeleteSurvey/${id}/`)
            .map(res => (res.json()))
    }
}