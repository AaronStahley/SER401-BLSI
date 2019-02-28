import AbstractStore from "./AbstractStore";
import BluebirdPromise from "../common/BluebirdPromise";
import StateRecommendation from "../model/StateRecommendation";

export default class StateRecommendationStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(StateRecommendation, 'state_recommendation', rootStore, transporter);
    }
}