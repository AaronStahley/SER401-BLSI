import AbstractStore from "./AbstractStore";
import QuestionOption from "../model/QuestionOption";

export default class QuestionOptionStore extends AbstractStore {
    algorithm;

    constructor(rootStore, algorithm, transporter) {
        super(QuestionOption, 'question_option', rootStore, transporter);
        this.algorithm = algorithm;
    }

    init() {
        return this.transporter.select(`select ${this.table}.* from ${this.table} join question on question.id = ${this.table}.question_id and question.algorithm_id = ?;`, [this.algorithm.Id])
            .then(this.processResults)
    }
}