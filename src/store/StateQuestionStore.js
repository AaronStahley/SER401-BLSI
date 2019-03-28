import StateQuestion from "../model/StateQuestion";
import AbstractAlgorithmStore from "./AbstractAlgorithmStore";
import StateStore from "./StateStore";

export default class StateQuestionStore extends AbstractAlgorithmStore {
    static TABLE_NAME = 'state_question';

    constructor(rootStore, algorithm, transporter) {
        super(StateQuestion, StateQuestionStore.TABLE_NAME, algorithm, rootStore, transporter);
    }

    init() {
        return this.transporter.select(`select ${this.table}.* from ${this.table} join state on state.id = ${this.table}.state_id and state.algorithm_id = ?;`, [this.algorithm.id])
            .then(this.processResults)
    }

    deleteAll() {
        this.collection.clear();
        return this.transporter.execute(`delete from ${this.table} where ${this.table}.state_id in (select s.id from ${StateStore.TABLE_NAME} as s where s.algorithm_id = ?)`, [this.algorithm.id])
    }
}