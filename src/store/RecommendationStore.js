import AbstractStore from "./AbstractStore";
import Recommendation from "../model/Recommendation";

export default class RecommendationStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Recommendation, 'recommendation', rootStore, transporter, true);
    }

    findStateRecommendations = state => {
        return this.transporter.select(`
SELECT recommendation.* FROM recommendation 
JOIN state_recommendation ON recommendation.id = state_recommendation.recommendation_id
WHERE state_recommendation.state_id = ?`, [state.Id])
            .then(this.processResults);
    };

    updateAll = (recommendations) => {
        return Promise.all(recommendations.map((item) => {
            this.update(item);
        }));
    }

    insertAll = (recommendations, updateCallback) => {
        return Promise.all(recommendations.map((item) => {
            this.insert(item, updateCallback);
        }));
    }

    updateOrInsertAll = (recommendations) => {
        return Promise.all(recommendations.map((item) => {
            this.updateOrInsert(item);
        }));
    }
}