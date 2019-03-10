import AlgorithmStore from '../AlgorithmStore';
import QuestionStore from '../QuestionStore';
import RecommendationStore from '../RecommendationStore';
import StateStore from '../StateStore';
import Transporter from "../../common/Transporter";
import QuestionAnswerStore from "../QuestionAnswerStore";
import QuestionOptionStore from "../QuestionOptionStore";
import UpdateStore from '../UpdateStore';
import StateQuestionStore from '../StateQuestionStore';
import StateRecommendationStore from '../StateRecommendationStore';

export default class AlgorithmRootStore {
    rootStore;
    transporter;
    stateStore;
    questionStore;
    questionAnswerStore;
    questionOptionStore;
    recommendationStore;
    stateQuestionStore;
    stateRecommendationStore;

    constructor(algorithm, rootStore, transporter) {
        this.algorithm                = algorithm;
        this.rootStore                = rootStore;
        this.transporter              = transporter;
        this.questionStore            = new QuestionStore(this, algorithm, this.transporter);
        this.questionAnswerStore      = new QuestionAnswerStore(this, algorithm, this.transporter);
        this.questionOptionStore      = new QuestionOptionStore(this, algorithm, this.transporter);
        this.recommendationStore      = new RecommendationStore(this, algorithm, this.transporter);
        this.stateStore               = new StateStore(this, algorithm, this.transporter);
        this.stateQuestionStore       = new StateQuestionStore(this, algorithm, this.transporter);
        this.stateRecommendationStore = new StateRecommendationStore(this, algorithm, this.transporter);
    }

    init() {
        return Promise.all([
            this.questionStore.init(),
            this.questionAnswerStore.init(),
            this.questionOptionStore.init(),
            this.recommendationStore.init(),
            this.stateStore.init(),
            this.stateQuestionStore.init(),
            this.stateRecommendationStore.init()
        ]);
    }
}