import AlgorithmStore from './AlgorithmStore';
import QuestionStore from './QuestionStore';
import RecommendationStore from './RecommendationStore';
import StateStore from './StateStore';
import Transporter from "../common/Transporter";
import QuestionAnswerStore from "./QuestionAnswerStore";
import QuestionOptionStore from "./QuestionOptionStore";

export default class RootStore {
    transporter;
    algorithmStore;
    questionStore;
    recommendationStore;
    stateStore;

    constructor(dbName) {
        this.transporter         = new Transporter(dbName);
        this.algorithmStore      = new AlgorithmStore(this, this.transporter);
        this.questionStore       = new QuestionStore(this, this.transporter);
        this.questionAnswerStore = new QuestionAnswerStore(this, this.transporter);
        this.questionOptionStore = new QuestionOptionStore(this, this.transporter);
        this.recommendationStore = new RecommendationStore(this, this.transporter);
        this.stateStore          = new StateStore(this, this.transporter);
    }

    init() {
        return this.transporter.init();
    }
}