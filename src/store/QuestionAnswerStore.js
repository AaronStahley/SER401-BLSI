import AbstractStore from "./AbstractStore";
import QuestionAnswer from "../model/QuestionAnswer";

export default class QuestionAnswerStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(QuestionAnswer, 'question_answer', rootStore, transporter);
    }

    findQuestionAnswer = (question) => {
        return this.transporter.select(`select * from ${this.table} where question_id = ? and state_id = ?;`, [question.Id, question.State.Id])
            .then(this.processResults)
            .then(objects => objects.length > 0 ? objects[0] : null)
    };


    create = (question) => {
        return new QuestionAnswer(this)
            .fromObj({
                QuestionId: question.id,
                StateId   : question.State.id
            })
    }

}