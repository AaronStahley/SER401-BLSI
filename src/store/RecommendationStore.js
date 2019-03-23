import Recommendation from "../model/Recommendation";
import AbstractAlgorithmStore from "./AbstractAlgorithmStore";

export default class RecommendationStore extends AbstractAlgorithmStore {
    static TABLE_NAME = 'recommendation';

    constructor(rootStore, algorithm, transporter) {
        super(Recommendation, RecommendationStore.TABLE_NAME, algorithm, rootStore, transporter);
    }
}