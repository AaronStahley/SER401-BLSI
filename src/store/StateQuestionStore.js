import AbstractStore from "./AbstractStore";
import StateQuestion from "../model/StateQuestion";

export default class StateQuestionStore extends AbstractStore {
    algorithm;

    constructor(rootStore, algorithm, transporter) {
        super(StateQuestion, 'state_question', rootStore, transporter);
        this.algorithm = algorithm;
    }

    init() {
        return this.transporter.select(`select ${this.table}.* from ${this.table} join state on state.id = ${this.table}.state_id and state.algorithm_id = ?;`, [this.algorithm.Id])
            .then(this.processResults)
    }
}