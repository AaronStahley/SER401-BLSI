import {observable, action, computed} from 'mobx'
import AbstractModel from "./AbstractModel";
import BluebirdPromise from "../../common/BluebirdPromise";

export default class State extends AbstractModel {
    Id                          = null;
    StateIdNextGood             = null;
    StateIdNextBad              = null;
    @observable Questions       = null;
    @observable Recommendations = null;

    @computed
    get completed() {
        return this.Questions.filter(question => question.Answer.completed).length === this.Questions.length;
    }


    @computed
    get started() {
        return this.Questions.filter(question => question.Answer.completed).length > 0;
    }

    @computed
    get NextStateId() {
        if (this.completed) {
            return this.Questions.filter(question => {
                return !question.Answer.IsGood
            }).length > 0 ? this.StateIdNextBad : this.StateIdNextGood;
        }
        return null;
    }

    @action
    init() {
        return BluebirdPromise.all([
            this.store.rootStore.questionStore.findStateQuestions(this)
                .then(res => {
                    return BluebirdPromise.all(
                        res.map(question => {
                            return question.init(this);
                        })
                    );
                }),
            this.store.rootStore.recommendationStore.findStateRecommendations(this)
        ])
            .then(([questions, recommendations]) => {
                this.Questions       = questions;
                this.Recommendations = recommendations;
                return this;
            })
    }
}