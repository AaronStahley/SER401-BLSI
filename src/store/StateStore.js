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

    updateAll = (states) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            this.updateWithParts(item);
        }));
    };

    updateWithParts = (json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.update(json)
            .then(this.processResults)
            .then((res) => Promise.all(question_ids.map((item) => this.rootStore.stateQuestionStore.update({
                    state_id   : json.id,
                    question_id: item
                }))).then(() => res)
            )
            .then((res) => Promise.all(recommendation_ids.map((item) => this.rootStore.stateRecommendationStore.update({
                    state_id         : json.id,
                    recommendation_id: item
                }))).then(() => res)
            )
    };

    insertAll = (states) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            return this.insertWithParts(item);
        }));
    };

    insertWithParts = (json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.insert(json)
            .then((res) => {
                return question_ids === []
                    ? res
                    : Promise.all(question_ids.map((item) => this.rootStore.stateQuestionStore.insert({
                            state_id   : json.id,
                            question_id: item
                        })
                    )).then(() => res);

            })
            .then((res) => {
                return recommendation_ids === []
                    ? res
                    : Promise.all(recommendation_ids.map((item) => this.rootStore.stateRecommendationStore.insert({
                            state_id         : json.id,
                            recommendation_id: item
                        })
                    )).then(() => res);

            }).catch(err => {
                console.log(json);
            });
    };

    updateOrInsertAll = (states) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            this.updateOrInsertWithParts(item);
        }));
    };

    updateOrInsertWithParts = (json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.updateOrInsert(json)
            .then(this.processResults)
            .then((res) => {
                return question_ids === []
                    ? res
                    : Promise.all(question_ids.map((item) => this.rootStore.stateQuestionStore.updateOrInsert({
                            id         : json.id,
                            question_id: item
                        })
                    )).then(() => res);

            }).then((res) => {
                return recommendation_ids === []
                    ? res
                    : Promise.all(recommendation_ids.map((item) => this.rootStore.stateRecommendationStore.updateOrInsert({
                            id               : json.id,
                            recommendation_id: item
                        })
                    )).then(() => res);
            })
    };
}