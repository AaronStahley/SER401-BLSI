import AbstractStore from "./AbstractStore";
import Algorithm from "../model/Algorithm";

export default class AlgorithmStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Algorithm, 'algorithm', rootStore, transporter, true);
    }

    deleteStates = (id) => {
        return this.transporter.execute(`delete from ${this.rootStore.stateStore.table} where AlgorithmId = ?`, [id])
    };

    deleteQuestions = (id) => {
        return this.transporter.execute(`delete from ${this.rootStore.questionStore.table} where AlgorithmId = ?`, [id])
    };

    deleteRecommendation = (id) => {
        return this.transporter.execute(`delete from ${this.rootStore.recommendationStore.table} where AlgorithmId = ?`, [id])
    };
}