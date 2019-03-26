import {computed} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class State extends AbstractModel {
    id                 = null;
    path               = null;
    state_id_next_good = null;
    state_id_next_bad  = null;
    algorithm_id       = null;
    is_initial         = null;

    setPath(path) {
        this.path = path;
        return this;
    }

    getPath() {
        return this.path;
    }

    @computed
    get Recommendations() {
        return this.rootStore.stateRecommendationStore.collection
            .filter(item => item.state_id === this.id)
            .map(item => item.Recommendation);
    }

    @computed
    get Questions() {
        return this.rootStore.stateQuestionStore.collection
            .filter(item => item.state_id === this.id)
            .map(item => item.Question);
    }

    @computed
    get QuestionAnswers() {
        return this.Questions
            .map(question => {
                let answer = this.rootStore.questionAnswerStore.collection.find(questionAnswer => questionAnswer.question_id === question.id && questionAnswer.state_path === this.path);
                return answer ? answer : this.rootStore.questionAnswerStore.create(question, this);
            });
    }

    @computed
    get completed() {
        return !(this.QuestionAnswers.filter(questionAnswer => !questionAnswer.completed).length > 0);
    }

    @computed
    get started() {
        return (this.QuestionAnswers.filter(questionAnswer => questionAnswer.completed).length > 0);
    }

    @computed
    get NextStateId() {
        if (this.completed) {
            return this.QuestionAnswers.filter(questionAnswer => {
                return !questionAnswer.IsGood
            }).length > 0 ? this.state_id_next_bad : this.state_id_next_good;
        }
        return null;
    }

    @computed
    get NextStateType() {
        if (this.completed) {
            return this.QuestionAnswers.filter(questionAnswer => {
                return !questionAnswer.IsGood
            }).length > 0 ? "bad" : "good";
        }
        return null;
    }


    toJson() {
        let clonedState = Object.assign({}, this);
        delete clonedState.path;
        return this._toJson(clonedState);
    }
}