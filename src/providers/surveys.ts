import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { SurveyEntry } from '../models/surveyEntry';

@Injectable()
export class Surveys {

    surveyUrl = 'http://192.168.178.40:4567';


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
      return this.http.put(`${this.surveyUrl}/updateSurvey/15/`, data, { headers: headers })
          .map(res => <SurveyEntry[]>res.json());
              

  }

  // Get survey by id
  loadDetails(id: number): Observable<SurveyEntry> {
      return this.http.get(`${this.surveyUrl}/getSurveyById/${id}/`)
          .map(res => <SurveyEntry>(res.json()))
  }

}
