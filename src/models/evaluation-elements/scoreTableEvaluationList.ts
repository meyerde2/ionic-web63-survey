import { ScoreTableAnswerCounter} from './helper/scoreTableAnswerCounter';


export interface ScoreTableEvaluationList {
    surveyId: number;
    elementId: number;
    scoreTableAnswerCounter: ScoreTableAnswerCounter;
}