import QuestionAnswer from "../model/QuestionAnswer";
import AbstractAlgorithmStore from "./AbstractAlgorithmStore";
import QuestionStore from "./QuestionStore";

export default class QuestionAnswerStore extends AbstractAlgorithmStore {
    static TABLE_NAME = 'question_answer';

    constructor(rootStore, algorithm, transporter) {
        super(QuestionAnswer, QuestionAnswerStore.TABLE_NAME, algorithm, rootStore, transporter);
    }

    init() {
        return this.transporter.select(`select ${this.table}.* from ${this.table} join question on question.id = ${this.table}.question_id and question.algorithm_id = ?;`, [this.algorithm.id])
            .then(this.processResults)
    }

    deleteAll() {
        this.collection.clear();
        return this.transporter.execute(`delete from ${this.table} where ${this.table}.question_id in (select q.id from ${QuestionStore.TABLE_NAME} as q where q.algorithm_id = ?)`, [this.algorithm.id])
    }

    create = (question, state) => {
        return new QuestionAnswer(this)
            .fromObj({
                question_id: question.id,
                state_path : state.getPath()
            })
    }

}