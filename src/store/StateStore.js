import AbstractStore from "./AbstractStore";
import State from "../model/State";
import BluebirdPromise from "../common/BluebirdPromise";

export default class StateStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(State, 'state', rootStore, transporter);
    }

    update = (json) => {
        let question_ids = json.question_ids;
        delete json.question_ids;

        let recommendation_ids = json.recommendation_ids;
        delete json.recommendation_ids;

        return this.transporter.select(`update ${this.table} set ${json} where id = ${json.id}`)
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
}