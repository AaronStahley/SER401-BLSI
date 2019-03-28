/**
 * Create by Taylor Greeff
 */

import AbstractModel from "./AbstractModel";

export default class StateRecommendation extends AbstractModel {
    state_id          = null;
    recommendation_id = null;

    get State() {
        return this.rootStore.stateStore.get(this.state_id);
    }

    get Recommendation() {
        return this.rootStore.recommendationStore.get(this.recommendation_id);
    }
}