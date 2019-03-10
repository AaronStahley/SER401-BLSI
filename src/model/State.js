import {observable, action, computed} from 'mobx'
import AbstractModel from "./AbstractModel";
import BluebirdPromise from "../common/BluebirdPromise";

export default class State extends AbstractModel {
    Id              = null;
    Path            = null;
    StateIdNextGood = null;
    StateIdNextBad  = null;
    AlgorithmId     = null;

    setPath(path) {
        this.Path = path;
        return this;
    }

    getPath() {
        return this.Path;
    }

    @computed
    get Recommendations() {
        return this.rootStore.stateRecommendationStore.collection
            .filter(item => item.StateId === this.Id)
            .map(item => item.Recommendation);
    }

    @computed
    get Questions() {
        return this.rootStore.stateQuestionStore.collection
            .filter(item => item.StateId === this.Id)
            .map(item => item.Question);
    }

    @computed
    get QuestionAnswers() {
        return this.Questions
            .map(question => {
                let answer = this.rootStore.questionAnswerStore.collection.find(questionAnswer => questionAnswer.QuestionId === question.Id && questionAnswer.StatePath === this.Path);
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
            }).length > 0 ? this.StateIdNextBad : this.StateIdNextGood;
        }
        return null;
    }
}