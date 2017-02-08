import { ClosedAnswerCounter } from './helper/closedAnswerCounter';


export interface ClosedQuestionEvaluationList {
    surveyId: number;
    elementId: number;
    closedAnswerCounter: ClosedAnswerCounter;
    optionalTextfield: string[];
}