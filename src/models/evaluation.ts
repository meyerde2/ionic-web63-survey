import { PersonalDataEvaluationList } from './evaluation-elements/personalDataEvaluationList';
import { ClosedQuestionEvaluationList } from './evaluation-elements/closedQuestionEvaluationList';
import { OpenQuestionEvaluationList } from './evaluation-elements/openQuestionEvaluationList';
import { ScoreTableEvaluationList } from './evaluation-elements/scoreTableEvaluationList';
import { SurveyElementList } from './evaluation-elements/surveyElementList';


export interface Evaluation {
    surveyElementList: SurveyElementList;
    personalDataEvaluationList: PersonalDataEvaluationList;
    closedQuestionEvaluationList: ClosedQuestionEvaluationList;
    openQuestionEvaluationList: OpenQuestionEvaluationList;
    scoreTableEvaluationList: ScoreTableEvaluationList;

}