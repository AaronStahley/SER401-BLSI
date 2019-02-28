import AbstractStore from "./AbstractStore";
import State from "../model/State";
import BluebirdPromise from "../common/BluebirdPromise";

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
                    return this.rootStore.StateQuestionStore.update({
                        id: json.id, 
                        question_id: item
                    });
                }))
                return res;
            }).then((res) => {
                Promise.all(recommendation_ids.map((item) => {
                    return this.rootStore.StateRecommendationStore.update({
                        id: json.id,
                        recommendation_id: item
                    });
                }))
                return res;
            })
    };

    insertAll = (states) => {
        return Promise.all(states.map((item) => {
            //item has nested info
            this.insertWithParts(item);
        }));
    }

    insertWithParts = (json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;
        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.insert(json)
            .then((res) => {
                Promise.all(question_ids.map((item) => {
                    return this.rootStore.StateQuestionStore.insert({
                        id: json.id,
                        question_id: item
                    });
                }))
                return res;
            }).then((res) => {
                Promise.all(recommendation_ids.map((item) => {
                    return this.rootStore.StateRecommendationStore.insert({
                        id: json.id,
                        recommendation_id: item
                    });
                }))
                return res;
            })
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
                Promise.all(question_ids.map((item) => {
                    return this.rootStore.StateQuestionStore.updateOrInsert({
                        id: json.id,
                        question_id: item
                    });
                }))
                return res;
            }).then((res) => {
                Promise.all(recommendation_ids.map((item) => {
                    return this.rootStore.StateRecommendationStore.updateOrInsert({
                        id: json.id,
                        recommendation_id: item
                    });
                }))
                return res;
            })
    };
}