import AbstractStore from "./AbstractStore";
import Question from "../model/Question";
import {QuestionOption} from "../model/Question";
import BluebirdPromise from "../../common/BluebirdPromise";

export default class QuestionStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Question, 'question', rootStore, transporter);
    }


    findStateQuestions = state => {
        return this.transporter.select(`
SELECT question.* FROM question 
JOIN state_question ON question.id = state_question.question_id
WHERE state_question.state_id = ?`, [state.Id])
            .then(this.processResults);
    };
}