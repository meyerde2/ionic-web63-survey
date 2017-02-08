import { LocationCount } from './helper/locationCount';


export interface PersonalDataEvaluationList {
    surveyId: number;
    elementId: number;
    ageMin: number;
    ageMax: number;
    ageMedian: Number;
    ageAverage: Number;
    standardDeviation: Number;
    ages: number[];
    maleCounter: number;
    femaleCounter: number;
    locationCount: LocationCount[];
}