import AbstractStore from "./AbstractStore";
import Question from "./../model/Question";
import {QuestionOption} from "../model/Question";
import BluebirdPromise from "../../common/BluebirdPromise";
import QuestionAnswer from "../model/QuestionAnswer";

export default class QuestionAnswerStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(QuestionAnswer, 'question_answer', rootStore, transporter);
    }

    findQuestionAnswer = question => {
        if (!question.State) {
            return new BluebirdPromise((resolve, reject) => {
                resolve(new QuestionAnswer(this));
            })
        }

        return this.transporter.select(`select * from ${this.table} where question = ? and state_id =?;`, [question.id, question.State.id])
            .then(this.preProcessResults)
            .then(this.processResults)
            .then(this.postProcessResults);
    };

}