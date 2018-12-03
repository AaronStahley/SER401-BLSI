import AbstractStore from "./AbstractStore";
import Recommendation from "../model/Recommendation";

export default class RecommendationStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Recommendation, 'recommendation', rootStore, transporter, true);
    }
}