import Transporter from "../../common/Transporter";
import UpdateStore from '../UpdateStore';
import AlgorithmRootStore from "./AlgorithmRootStore";
import AlgorithmStore from "../AlgorithmStore";

export default class RootStore {
    transporter;
    algorithmStore;
    algorithmRootStore;
    updateStore;

    constructor(dbName) {
        this.transporter    = new Transporter(dbName);
        this.updateStore    = new UpdateStore(this, this.transporter);
        this.algorithmStore = new AlgorithmStore(this, this.transporter);
    }


    get stateStore() {
        return !this.algorithmRootStore ? null : this.algorithmRootStore.stateStore;
    };

    get questionStore() {
        return !this.algorithmRootStore ? null : this.algorithmRootStore.questionStore;
    };

    get questionAnswerStore() {
        return !this.algorithmRootStore ? null : this.algorithmRootStore.questionAnswerStore;
    };

    get questionOptionStore() {
        return !this.algorithmRootStore ? null : this.algorithmRootStore.questionOptionStore;
    };

    get recommendationStore() {
        return !this.algorithmRootStore ? null : this.algorithmRootStore.recommendationStore;
    };

    get stateQuestionStore() {
        return !this.algorithmRootStore ? null : this.algorithmRootStore.stateQuestionStore;
    };

    get stateRecommendationStore() {
        return !this.algorithmRootStore ? null : this.algorithmRootStore.stateRecommendationStore;
    };

    init() {
        return this.transporter.init();
    }

    createAlgorithmRootStore(algorithm) {
        this.algorithmRootStore = new AlgorithmRootStore(algorithm, this, this.transporter);
        return this.algorithmRootStore.init();
    }
}