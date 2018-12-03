import {observable, action, computed} from 'mobx'
import AbstractModel from "./AbstractModel";
import BluebirdPromise from "../../common/BluebirdPromise";

export default class State extends AbstractModel {
    Id                          = null;
    StateIdNextGood             = null;
    StateIdNextBad              = null;
    @observable _Questions      = null;
    @observable Recommendations = [];

    @computed
    get loaded() {
        return !!this._Questions;
    }

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
        console.log('completed', this.completed);
        if (this.completed) {
            return this.Questions.filter(question => {
                return !question.Answer.IsGood
            }).length > 0 ? this.StateIdNextBad : this.StateIdNextGood;
        }
        return null;
    }


    @computed
    get Questions() {
        if (!this._Questions) {
            this.store.rootStore.questionStore.findStateQuestions(this)
                .then(res => {
                    return BluebirdPromise.all(
                        res.map(question => {
                            return question.init(this);
                        })
                    );
                })
                .then(questions => this._Questions = questions);

            return [];
        }

        return this._Questions;
    }
}