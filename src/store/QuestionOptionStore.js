import AbstractStore from "./AbstractStore";
import QuestionOption from "../model/QuestionOption";

export default class QuestionOptionStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(QuestionOption, 'question_option', rootStore, transporter, true);
    }


    findQuestionOptions = (question) => {
        return this.transporter.select(`SELECT * FROM question_option WHERE question_option.question_id = ?`, [question.Id])
            .then(this.processResults)
    }
}