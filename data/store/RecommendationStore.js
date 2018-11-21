import AbstractStore from "./AbstractStore";
import Recommendation from "data/model/Recommendation";

export default class RecommendationStore extends AbstractStore {
    constructor(transporter) {
        super(Recommendation, 'recommendation', transporter);
    }
}