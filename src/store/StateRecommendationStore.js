import AbstractStore from "./AbstractStore";
import StateRecommendation from "../model/StateRecommendation";

export default class StateRecommendationStore extends AbstractStore {
    algorithm;

    constructor(rootStore, algorithm, transporter) {
        super(StateRecommendation, 'state_recommendation', rootStore, transporter);
        this.algorithm = algorithm;
    }

    init() {
        return this.transporter.select(`select ${this.table}.* from ${this.table} join state on state.id = ${this.table}.state_id and state.algorithm_id = ?;`, [this.algorithm.Id])
            .then(this.processResults);
    }
}