/**
 * Create by Taylor Greeff
 */

import AbstractModel from "./AbstractModel";

export default class StateRecommendation extends AbstractModel {
    StateId          = null;
    RecommendationId = null;

    get State() {
        return this.rootStore.stateStore.get(this.StateId);
    }

    get Recommendation() {
        return this.rootStore.recommendationStore.get(this.RecommendationId);
    }
}