import AbstractStore from "./AbstractStore";
import State from "../model/State";

export default class StateStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(State, 'state', rootStore, transporter);
    }

    updateAll = (states) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            this.updateWithParts(item);
        }));
    }
    
    updateWithParts = (json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.update(json)
            .then(this.processResults)
            .then((res) => {
                Promise.all(question_ids.map((item) => {
                    return this.rootStore.stateQuestionStore.update({
                        state_id: json.id,
                        question_id: item
                    });
                }))
                return res;
            }).then((res) => {
                Promise.all(recommendation_ids.map((item) => {
                    return this.rootStore.stateRecommendationStore.update({
                        state_id: json.id,
                        recommendation_id: item
                    });
                }))
                return res;
            })
    };

    insertAll = (states, updateCallback) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            this.insertWithParts(item, updateCallback);
        }));
    }

    insertWithParts = (json, updateCallback) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.insert(json, updateCallback)
            .then((res) => {
                if (question_ids === []) {
                    return res;
                }
                Promise.all(question_ids.map((item) => {
                    return this.rootStore.stateQuestionStore.insert({
                        state_id: json.id,
                        question_id: item
                    }, updateCallback);
                }))
                return res;
            }).then((res) => {
                if (recommendation_ids === []) {
                    return res;
                }
                Promise.all(recommendation_ids.map((item) => {
                    return this.rootStore.stateRecommendationStore.insert({
                        state_id: json.id,
                        recommendation_id: item
                    }, updateCallback);
                }))
                return res;
            }).catch(err => {
                console.log(json);
            });
    };

    updateOrInsertAll = (states) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            this.updateOrInsertWithParts(item);
        }));
    }

    updateOrInsertWithParts = (json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.updateOrInsert(json)
            .then(this.processResults)
            .then((res) => {
                if(question_ids === []) {
                    return res;
                }
                Promise.all(question_ids.map((item) => {
                    return this.rootStore.stateQuestionStore.updateOrInsert({
                        id: json.id,
                        question_id: item
                    });
                }))
                return res;
            }).then((res) => {
                if (recommendation_ids === []) {
                    return res;
                }
                Promise.all(recommendation_ids.map((item) => {
                    return this.rootStore.stateRecommendationStore.updateOrInsert({
                        id: json.id,
                        recommendation_id: item
                    });
                }))
                return res;
            })
    };
}