import AbstractStore from "./AbstractStore";
import State from "../model/State";

export default class StateStore extends AbstractStore {
    algorithm;

    constructor(rootStore, algorithm, transporter) {
        super(State, 'state', rootStore, transporter);
        this.algorithm = algorithm;
    }

    createInstance(stateId, path = "") {
        return (new State(this))
            .fromObj(this.get(stateId))
            .setPath(`${path}:${stateId}`)
    }

    init() {
        return this.transporter.select(`select * from ${this.table} where algorithm_id = ?;`, [this.algorithm.Id])
            .then(this.processResults)
    }

    dynamicInsertionAll = (funcName, states) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            this.dynamicInsertionWithParts(funcName, item);
        }));
    };

    dynamicInsertionWithParts = (funcName, json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this[funcName](json)
            .then(this.processResults)
            .then((res) => {
                return question_ids === [] ?
                    res :
                    Promise.all(question_ids.map((item) => this.rootStore.stateQuestionStore[funcName]({
                        id: json.id,
                        question_id: item
                    }))).then(() => res);

            }).then((res) => {
                return recommendation_ids === [] ?
                    res :
                    Promise.all(recommendation_ids.map((item) => this.rootStore.stateRecommendationStore[funcName]({
                        id: json.id,
                        recommendation_id: item
                    }))).then(() => res);
            })
    };
}