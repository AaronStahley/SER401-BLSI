import AbstractStore from "./AbstractStore";
import Recommendation from "../model/Recommendation";

export default class RecommendationStore extends AbstractStore {
    algorithm;

    constructor(rootStore, algorithm, transporter) {
        super(Recommendation, 'recommendation', rootStore, transporter);
        this.algorithm = algorithm;
    }

    init() {
        return this.transporter.select(`select * from ${this.table} where algorithm_id = ?;`, [this.algorithm.Id])
            .then(this.processResults)
    }

    updateAll = (recommendations) => {
        return Promise.all(recommendations.map((item) => {
            this.update(item);
        }));
    };

    insertAll = (recommendations) => {
        return Promise.all(recommendations.map((item) => {
            return this.insert(item);
        }));
    };

    updateOrInsertAll = (recommendations) => {
        return Promise.all(recommendations.map((item) => {
            this.updateOrInsert(item);
        }));
    }
}