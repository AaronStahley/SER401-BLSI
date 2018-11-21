import AlgorithmStore from './AlgorithmStore';
import QuestionStore from './QuestionStore';
import RecommendationStore from './RecommendationStore';
import StateStore from './StateStore';
import Transporter from "../../common/Transporter";

export default class RootStore {
    transporter;
    algorithmStore;
    questionStore;
    recommendationStore;
    stateStore;

    constructor() {

        this.transporter         = new Transporter();
        this.algorithmStore      = new AlgorithmStore(this.transporter);
        this.questionStore       = new QuestionStore(this.transporter);
        this.recommendationStore = new RecommendationStore(this.transporter);
        this.stateStore          = new StateStore(this.transporter);

    }
}