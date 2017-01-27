import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { SurveyEntry } from '../models/surveyEntry';
import { SurveyElement } from '../models/surveyElement';


@Injectable()
export class Surveys {

    //surveyUrl = 'http://192.168.178.40:4567';
    surveyUrl = 'http://localhost:4567';

  constructor(public http: Http) {
    console.log('Hello Survey Provider');
  }


  // Load all surveys
  load(): Observable<SurveyEntry[]> {
      
      let headers = new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
      });
    

      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.surveyUrl}/getAllSurveyEntries/`)
        .map(res => <SurveyEntry[]>res.json());
  }

 
  // Load all surveys
  putSurvey(): Observable<SurveyEntry[]> {

     

      var username = "myusernameJunge";

      var password = "pw";

      let headers = new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
      });
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', username);
      urlSearchParams.append('hashedPassword', password);

      var data = JSON.stringify({ username: 'CHEFFE' });

      let body = urlSearchParams.toString()
      console.log("putSurvey!!!!!!!!!!!!");

      return this.http.put(`${this.surveyUrl}/updateSurvey/15/`, body
      )
          .map(res => <SurveyEntry[]>res.json());
              

  }

  updateSurveyEntry(survey: SurveyEntry) {


      let headers = new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',

      });


      console.log("survey provider: " + JSON.stringify(survey));
      console.log("URL: " + `${this.surveyUrl}/updateSurvey/${survey.surveyId}/`);

      this.http.put(`${this.surveyUrl}/updateSurvey/${survey.surveyId}/`, JSON.stringify(survey), { headers: headers })
          .map(res => <SurveyEntry[]>res.json(),
          error => {
              console.error("Error deleting food!");
              return Observable.throw(error);
          }).subscribe();
        console.log("URL: " + `${this.surveyUrl}/updateSurvey/${survey.surveyId}/`);
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
}
