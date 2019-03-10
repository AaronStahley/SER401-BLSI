import AbstractStore from "./AbstractStore";
import QuestionAnswer from "../model/QuestionAnswer";

export default class QuestionAnswerStore extends AbstractStore {
    algorithm;

    constructor(rootStore, algorithm, transporter) {
        super(QuestionAnswer, 'question_answer', rootStore, transporter);
        this.algorithm = algorithm;
    }

    init() {
        return this.transporter.select(`select ${this.table}.* from ${this.table} join question on question.id = ${this.table}.question_id and question.algorithm_id = ?;`, [this.algorithm.Id])
            .then(this.processResults)
    }

    deleteAll() {
        this.collection.clear();
        return this.transporter.execute(`delete from ${this.table} where id in (select ${this.table}.id from ${this.table} join question on question.id = ${this.table}.question_id and question.algorithm_id = ?)`, [this.algorithm.Id])
    }

    create = (question, state) => {
        return new QuestionAnswer(this)
            .fromObj({
                QuestionId: question.Id,
                StatePath : state.getPath()
            })
    }

}