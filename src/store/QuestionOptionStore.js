import QuestionOption from "../model/QuestionOption";
import AbstractAlgorithmStore from "./AbstractAlgorithmStore";
import QuestionStore from "./QuestionStore";

export default class QuestionOptionStore extends AbstractAlgorithmStore {
    static TABLE_NAME = 'question_option';

    constructor(rootStore, algorithm, transporter) {
        super(QuestionOption, QuestionOptionStore.TABLE_NAME, algorithm, rootStore, transporter);
    }

    init() {
        return this.transporter.select(`select ${this.table}.* from ${this.table} join question on question.id = ${this.table}.question_id and question.algorithm_id = ?;`, [this.algorithm.id])
            .then(this.processResults)
    }

    deleteAll() {
        this.collection.clear();
        return this.transporter.execute(`delete from ${this.table} as t where t.question_id in (select q.id from ${QuestionStore.TABLE_NAME} as q where q.algorithm_id = ?)`, [this.algorithm.id])
    }
}